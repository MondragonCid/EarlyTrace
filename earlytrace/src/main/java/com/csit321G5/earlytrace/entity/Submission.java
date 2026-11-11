package com.csit321G5.earlytrace.entity;

import java.time.LocalDateTime;

// import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity 
@Table(name="submissions")

public class Submission {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="submission_id")
    private Long submissionId;

    /*
    @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "assessment_id", insertable = false, updatable = false,
                foreignKey = @ForeignKey(name = "fk_submission_assessment"))
    @JsonIgnore
    private Assessment assessment;
    */

    @Column(name="assessment_id", nullable = false)
    private Long assessmentId;

    /* 
    @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "student_id", insertable = false, updatable = false,
                foreignKey = @ForeignKey(name = "fk_submission_student"))
    @JsonIgnore
     
    private Student student;
    */

    @Column(name="student_id", nullable = false)
    private Long studentId;
    

    @Column(nullable = false)
    private double scoreObtained;

    @Column(nullable = false)
    private String submissionStatus;

    @Column(nullable = false)
    private LocalDateTime submittedAt;

    @PrePersist
    protected void onCreate() {
        this.submittedAt = LocalDateTime.now();
    }

    public Long getSubmissionId() { return submissionId; }
    
    public Long getAssessmentId() { return assessmentId; }
    public void setAssessmentId(Long assessmentId) {this.assessmentId = assessmentId;}
    
    public Long getStudentId() { return studentId;} 
    public void setStudentId(Long studentId) {this.studentId = studentId;}
    

    public double getScoreObtained() { return scoreObtained; }
    public void setScoreObtained(double scoreObtained) { this.scoreObtained = scoreObtained; }

    public String getSubmissionStatus() { return submissionStatus; }
    public void setSubmissionStatus(String submissionStatus) { this.submissionStatus = submissionStatus; }

    public LocalDateTime getSubmittedAt(){ return submittedAt; }
    
}
