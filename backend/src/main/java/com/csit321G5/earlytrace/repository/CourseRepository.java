package com.csit321G5.earlytrace.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csit321G5.earlytrace.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}
