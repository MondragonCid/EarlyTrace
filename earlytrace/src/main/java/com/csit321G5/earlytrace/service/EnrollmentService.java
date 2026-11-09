package com.csit321G5.earlytrace.service;

import com.csit321G5.earlytrace.entity.Course;
import com.csit321G5.earlytrace.entity.Enrollment;
import com.csit321G5.earlytrace.entity.Role;
import com.csit321G5.earlytrace.entity.User;
import com.csit321G5.earlytrace.repository.CourseRepository;
import com.csit321G5.earlytrace.repository.EnrollmentRepository;
import com.csit321G5.earlytrace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EnrollmentService {

    private static final Set<String> VALID_TIERS = Set.of("GREEN", "YELLOW", "RED");

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Enrollment createEnrollment(Enrollment enrollment) {
        enrollment.setStudent(resolveStudent(enrollment.getStudent()));
        enrollment.setCourse(resolveCourse(enrollment.getCourse()));
        enrollment.setCurrentRiskTier(normalizeTier(enrollment.getCurrentRiskTier()));
        checkDuplicate(enrollment.getStudent().getId(), enrollment.getCourse().getCourseId(), null);
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public Enrollment getEnrollmentById(Long id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Enrollment " + id + " not found"));
    }

    public List<Enrollment> getEnrollmentsByCourse(Long courseId) {
        return enrollmentRepository.findByCourseCourseId(courseId);
    }

    public List<Enrollment> getEnrollmentsByStudent(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    public Enrollment updateEnrollment(Long id, Enrollment details) {
        Enrollment enrollment = getEnrollmentById(id);

        if (details.getStudent() != null) {
            enrollment.setStudent(resolveStudent(details.getStudent()));
        }
        if (details.getCourse() != null) {
            enrollment.setCourse(resolveCourse(details.getCourse()));
        }
        enrollment.setCurrentRiskTier(normalizeTier(details.getCurrentRiskTier()));

        checkDuplicate(enrollment.getStudent().getId(), enrollment.getCourse().getCourseId(), id);
        return enrollmentRepository.save(enrollment);
    }

    public void deleteEnrollment(Long id) {
        if (!enrollmentRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Enrollment " + id + " not found");
        }
        enrollmentRepository.deleteById(id);
    }

    private User resolveStudent(User ref) {
        if (ref == null || ref.getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "student.id is required");
        }
        User user = userRepository.findById(ref.getId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User " + ref.getId() + " not found"));
        if (user.getRole() != Role.STUDENT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "User " + user.getId() + " is not a student");
        }
        return user;
    }

    private Course resolveCourse(Course ref) {
        if (ref == null || ref.getCourseId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "course.courseId is required");
        }
        return courseRepository.findById(ref.getCourseId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Course " + ref.getCourseId() + " not found"));
    }

    private String normalizeTier(String tier) {
        if (tier == null || tier.isBlank()) {
            return null;
        }
        String upper = tier.trim().toUpperCase();
        if (!VALID_TIERS.contains(upper)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "currentRiskTier must be GREEN, YELLOW, or RED");
        }
        return upper;
    }

    private void checkDuplicate(Long studentId, Long courseId, Long currentId) {
        Optional<Enrollment> existing = enrollmentRepository.findByStudentIdAndCourseCourseId(studentId, courseId);
        if (existing.isPresent() && !existing.get().getId().equals(currentId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Student " + studentId + " is already enrolled in course " + courseId);
        }
    }
}