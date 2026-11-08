package com.csit321G5.earlytrace.entity;

import jakarta.persistence.*;

@Entity
@Table (name = "courses")
public class Course {
    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY)

    private Long courseId;
    private Long instructorId;
    private String courseTitle;
    private String courseCode;

    // instructorId methods

    // set & get
    public void setCourseTitle(String courseTitle) {this.courseTitle = courseTitle;}
    public void setCourseCode(String courseCode) {this.courseCode = courseCode;} 

    public String getCourseTitle() {return courseTitle;}
    public String getCourseCode() {return courseCode;}

    

}
