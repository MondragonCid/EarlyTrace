package com.csit321G5.earlytrace.service.csv.parser;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.csit321G5.earlytrace.dto.ImportedSubmission;
import com.csit321G5.earlytrace.entity.Assessment;
import com.csit321G5.earlytrace.entity.Course;
import com.csit321G5.earlytrace.entity.Student;
import com.csit321G5.earlytrace.entity.Submission;
import com.csit321G5.earlytrace.repository.AssessmentRepository;
import com.csit321G5.earlytrace.repository.CourseRepository;
import com.csit321G5.earlytrace.repository.EnrollmentRepository;
import com.csit321G5.earlytrace.repository.StudentRepository;
import com.csit321G5.earlytrace.repository.SubmissionRepository;
import com.csit321G5.earlytrace.service.csv.CsvIngestionService;
import com.csit321G5.earlytrace.service.csv.CsvPlatform;

@Service 
public class CsvDatabaseImportService {
    private final CsvIngestionService csvingestionServ;
    private final CourseRepository courseRepo;
    private final StudentRepository studentRepo;
    private final EnrollmentRepository enrollmentRepo;
    private final AssessmentRepository assessmentRepo;
    private final SubmissionRepository submissionRepo;

    public CsvDatabaseImportService(CsvIngestionService csvingestionServ,
        CourseRepository courseRepo, StudentRepository studentRepo,
        EnrollmentRepository enrollmentRepo, AssessmentRepository assessmentRepo,
        SubmissionRepository submissionRepo) {

        this.csvingestionServ = csvingestionServ;
        this.courseRepo = courseRepo;
        this.studentRepo = studentRepo;
        this.enrollmentRepo = enrollmentRepo;
        this.assessmentRepo = assessmentRepo;
        this.submissionRepo = submissionRepo;
    
    }

    @Transactional
    public int importCsv(MultipartFile file, CsvPlatform platform, Long courseId,
        Long instructorId) throws Exception {
            
        // verify course exists and belongs to instructor
        Course course = courseRepo
        .findByCourseIdAndInstructorId(courseId, instructorId)
        .orElseThrow(() -> new IllegalArgumentException("Course not found or does not belong to this instructor"));

        // parse & validate csv before saving anything
        List<ImportedSubmission> records = csvingestionServ.readAndParseCsv(file, platform);

        if(records.isEmpty()) {
            throw new IllegalArgumentException("The CSV file does not contain any submission records.");
            
        }

        
        // store assessments already encountered during importing
        Map<String, Assessment> importedAssessments = new HashMap<>();

        
        // track student-assessment combos w/in CSV
        Set<String> processedSubmissions = new HashSet<>();

        int savedCount = 0;

        for(ImportedSubmission record: records) {
            // find student using their email
            Student s = studentRepo
            .findByEmailIgnoreCase(record.getStudentEmail())
            .orElseThrow(() -> new IllegalArgumentException("Student not found " + record.getStudentEmail()));

            // verify student is enrolled in this course
            boolean isEnrolled = enrollmentRepo.findByStudentIdAndCourseId(s.getId(), courseId).isPresent();

            if(!isEnrolled) {
                throw new IllegalArgumentException(
                    "Student " + record.getStudentEmail() + " is not enrolled in course " + course.getCourseCode());
            }

            // determine assessment type & source platform
            String assessmentType = getAssessmentType(platform);
            String sourcePlatform = platform.name();

            // uses title + platform to find assessment in import
            String assessmentKey = record.getAssessmentTitle().trim().toLowerCase(Locale.ROOT) + "|" + sourcePlatform;

            Assessment a = importedAssessments.get(assessmentKey);

            if(a == null) {
                // check if it already exists in DB
                a = assessmentRepo.findByCourseIdAndTitleIgnoreCaseAndSourcePlatformIgnoreCase(courseId, record.getAssessmentTitle(), sourcePlatform)
                .orElse(null);

                if(a == null) {
                    // create a new one if needed
                    Assessment newA = new Assessment();
                    newA.setCourseId(courseId);
                    newA.setTitle(record.getAssessmentTitle());
                    newA.setAssessmentType(assessmentType);
                    newA.setSourcePlatform(sourcePlatform);
                    newA.setMaxScore(record.getTotal().doubleValue());

                    // weight assigned later through grading config
                    newA.setWeightPercentage(null);

                    newA = assessmentRepo.save(newA);
                } else {
                    // prevent records from being imported w/ inconsistent total scores for
                    // existing assessment

                    if(Double.compare(a.getMaxScore(), record.getTotal().doubleValue()) != 0) {
                        throw new IllegalArgumentException("Maximum score mismatch for assessment: " + record.getAssessmentTitle());
                    }
                }

                importedAssessments.put(assessmentKey, a);
            }
             
            // reject dupe submissions in same CSV
            String submissionKey = a.getAssessmentId() + "|" + s.getId();

            if(!processedSubmissions.add(submissionKey)) {
                throw new IllegalArgumentException("Duplicate submission for student " + record.getStudentEmail() + " in assessment " + record.getAssessmentTitle());
            }

            // reject submissions already stored in DB
            if(submissionRepo.existsByAssessmentIdAndStudentId(a.getAssessmentId(), s.getId())) {
                 throw new IllegalArgumentException("Submission already exists for student " + record.getStudentEmail() + " in assessment " + record.getAssessmentTitle());
            }

            // create & save submission
            Submission submit = new Submission();

            submit.setAssessmentId(a.getAssessmentId());
            submit.setStudentId(s.getId());
            submit.setScoreObtained(record.getScore().doubleValue());
            submit.setSubmissionStatus(record.getSubmissionStatus());

            submissionRepo.save(submit);

            savedCount++;

        }

        return savedCount;

    }

    private String getAssessmentType(CsvPlatform platform) {
        return switch(platform) {
            case CODECHUM -> "Programming Exercise";
            case GOOGLE_FORMS -> "Quiz";
            case MS_TEAMS -> "Assignment";
        };
    }
}
