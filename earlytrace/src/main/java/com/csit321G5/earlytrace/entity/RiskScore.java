package com.csit321G5.earlytrace.entity;
 
import java.time.LocalDateTime;
 
import jakarta.persistence.*;
 
@Entity
@Table(name = "risk_scores")
public class RiskScore {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "risk_score_id")
    private Long riskScoreId;
 
    @Column(name = "student_id", nullable = false)
    private Long studentId;
 
    @Column(name = "course_id", nullable = false)
    private Long courseId;
 
    @Column(nullable = false)
    private double academicMasteryScore;
 
    @Column(nullable = false)
    private double submissionConsistencyScore;
 
    @Column(nullable = false)
    private double compositeRiskScore;
 
    @Column(nullable = false, length = 10)
    private String riskTier;
 
    @Column(nullable = false)
    private LocalDateTime calculatedAt;
 
    @PrePersist
    protected void onCreate() {
        this.calculatedAt = LocalDateTime.now();
    }
 
    @PreUpdate
    protected void onUpdate() {
        this.calculatedAt = LocalDateTime.now();
    }
 
    public Long getRiskScoreId() { return riskScoreId; }
 
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
 
    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
 
    public double getAcademicMasteryScore() { return academicMasteryScore; }
    public void setAcademicMasteryScore(double academicMasteryScore) { this.academicMasteryScore = academicMasteryScore; }
 
    public double getSubmissionConsistencyScore() { return submissionConsistencyScore; }
    public void setSubmissionConsistencyScore(double submissionConsistencyScore) { this.submissionConsistencyScore = submissionConsistencyScore; }
 
    public double getCompositeRiskScore() { return compositeRiskScore; }
    public void setCompositeRiskScore(double compositeRiskScore) { this.compositeRiskScore = compositeRiskScore; }
 
    public String getRiskTier() { return riskTier; }
    public void setRiskTier(String riskTier) { this.riskTier = riskTier; }
 
    public LocalDateTime getCalculatedAt() { return calculatedAt; }
}