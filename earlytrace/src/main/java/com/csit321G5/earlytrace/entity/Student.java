package com.csit321G5.earlytrace.entity;

import jakarta.persistence.*;

@Entity 
@Table(name="students")
public class Student extends User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long studentId;
}
