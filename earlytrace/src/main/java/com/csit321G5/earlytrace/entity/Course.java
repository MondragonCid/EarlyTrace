package com.csit321G5.earlytrace.entity;

import jakarta.persistence.*;

@Entity
@Table (name = "courses")
public class Course {
    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long courseId;

    @Column(name="instructor_id")
    private Long instructorId;

    @Column(nullable = false)
    private String courseTitle;

    @Column(nullable = false)
    private String courseCode;

    @Column(nullable = false)
    private String sectionCode;

    // instructorId methods

    // set & get
    public Long getCourseId() {return courseId;}

    public void setInstructorId(Long instructorId) {this.instructorId = instructorId;}
    public void setCourseTitle(String courseTitle) {this.courseTitle = courseTitle;}
    public void setCourseCode(String courseCode) {this.courseCode = courseCode;}
    public void setSectionCode(String sectionCode) {this.sectionCode = sectionCode;}  

    public Long getInstructorId() { return instructorId;}
    public String getCourseTitle() {return courseTitle;}
    public String getCourseCode() {return courseCode;}
    public String getSectionCode() {return sectionCode;}

    

    

}