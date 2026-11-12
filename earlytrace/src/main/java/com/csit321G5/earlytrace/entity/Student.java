package com.csit321G5.earlytrace.entity;

import jakarta.persistence.*;

@Entity 
@Table(name="students")
public class Student extends User {

    @Column(nullable = false, unique = true)
    private String studentNo;

    @Column(nullable = false)
    private String program;

    @Column(nullable = false)
    private int yearLevel;

    //construct
    public Student() {

    }

    public Student(String email, String passwordHash, String fullName, 
        String studentNo, String program, int yearLevel) {
            super(email, passwordHash, fullName, Role.STUDENT);
            this.studentNo = studentNo;
            this.program = program;
            this.yearLevel = yearLevel;

    }

    // setsgets
    public String getStudentNo() { return studentNo; }
    public void setStudentNo(String studentNo) {this.studentNo = studentNo;}

    public String getProgram() { return program; }
    public void setProgram(String program) {this.program = program;}

    public int getYearLevel() { return yearLevel; }
    public void setYearLevel(int yearLevel) {this.yearLevel = yearLevel;}
}
