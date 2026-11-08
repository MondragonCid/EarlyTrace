package com.csit321G5.earlytrace.service;

import com.csit321G5.earlytrace.entity.Assessment;
import com.csit321G5.earlytrace.repository.AssessmentRepository;
import com.csit321G5.earlytrace.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Assessment createAssessment(Assessment assessment) {
        validate(assessment);
        return assessmentRepository.save(assessment);
    }

    public List<Assessment> getAllAssessments() {
        return assessmentRepository.findAll();
    }

    public Optional<Assessment> getAssessmentById(Long id) {
        return assessmentRepository.findById(id);
    }

    public List<Assessment> getAssessmentsByCourse(Long courseId) {
        return assessmentRepository.findByCourseId(courseId);
    }

    public Optional<Assessment> updateAssessment(Long id, Assessment details) {
        validate(details);
        return assessmentRepository.findById(id).map(assessment -> {
            assessment.setCourseId(details.getCourseId());
            assessment.setTitle(details.getTitle());
            assessment.setAssessmentType(details.getAssessmentType());
            assessment.setSourcePlatform(details.getSourcePlatform());
            assessment.setMaxScore(details.getMaxScore());
            assessment.setWeightPercentage(details.getWeightPercentage());
            return assessmentRepository.save(assessment);
        });
    }

    public boolean deleteAssessment(Long id) {
        if (!assessmentRepository.existsById(id)) {
            return false;
        }
        assessmentRepository.deleteById(id);
        return true;
    }

    private void validate(Assessment a) {
        if (a.getCourseId() == null) {
            throw new IllegalArgumentException("courseId is required");
        }
        if (!courseRepository.existsById(a.getCourseId())) {
            throw new IllegalArgumentException("Course " + a.getCourseId() + " does not exist");
        }
        if (a.getTitle() == null || a.getTitle().isBlank()) {
            throw new IllegalArgumentException("title is required");
        }
        if (a.getAssessmentType() == null || a.getAssessmentType().isBlank()) {
            throw new IllegalArgumentException("assessmentType is required");
        }
        if (a.getMaxScore() == null || a.getMaxScore() <= 0) {
            throw new IllegalArgumentException("maxScore must be greater than 0");
        }
        if (a.getWeightPercentage() == null
                || a.getWeightPercentage() < 0 || a.getWeightPercentage() > 100) {
            throw new IllegalArgumentException("weightPercentage must be between 0 and 100");
        }
    }
}
