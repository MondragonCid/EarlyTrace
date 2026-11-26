package com.csit321G5.earlytrace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csit321G5.earlytrace.entity.Submission;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long>{
    boolean existsByAssessmentIdAndStudentId(Long assessmentId, Long studentId);
}
