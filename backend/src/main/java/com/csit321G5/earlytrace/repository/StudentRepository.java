package com.csit321G5.earlytrace.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csit321G5.earlytrace.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}
