package com.csit321G5.earlytrace.repository;

import com.csit321G5.earlytrace.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    @Query("SELECT e FROM Enrollment e WHERE e.course.courseId = :courseId")
    List<Enrollment> findByCourseId(@Param("courseId") Long courseId);
    
    List<Enrollment> findByStudentId(Long studentId);
    
    @Query("SELECT e FROM Enrollment e " + "WHERE e.student.id = :studentId " + "AND e.course.courseId = :courseId")
    Optional<Enrollment> findByStudentIdAndCourseId(
        @Param("studentId") Long studentId,
        @Param("courseId") Long courseId
    );
}