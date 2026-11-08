package com.csit321G5.earlytrace.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "assessments")
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assessment_id")
    private Long assessmentId;

    // FK to COURSE. Kept as a plain id until the Course entity is merged;
    // then this can become @ManyToOne @JoinColumn(name = "course_id") private Course course;
    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @Column(nullable = false)
    private String title;

    // e.g. QUIZ, LAB, ASSIGNMENT, PROJECT, EXAM
    @Column(name = "assessment_type", nullable = false)
    private String assessmentType;

    // e.g. CODECHUM, GOOGLE_FORMS, MS_TEAMS
    @Column(name = "source_platform")
    private String sourcePlatform;

    @Column(name = "max_score", nullable = false)
    private Double maxScore;

    @Column(name = "weight_percentage", nullable = false)
    private Double weightPercentage;

    // Getters and Setters
    public Long getAssessmentId() { return assessmentId; }
    public void setAssessmentId(Long assessmentId) { this.assessmentId = assessmentId; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAssessmentType() { return assessmentType; }
    public void setAssessmentType(String assessmentType) { this.assessmentType = assessmentType; }

    public String getSourcePlatform() { return sourcePlatform; }
    public void setSourcePlatform(String sourcePlatform) { this.sourcePlatform = sourcePlatform; }

    public Double getMaxScore() { return maxScore; }
    public void setMaxScore(Double maxScore) { this.maxScore = maxScore; }

    public Double getWeightPercentage() { return weightPercentage; }
    public void setWeightPercentage(Double weightPercentage) { this.weightPercentage = weightPercentage; }
}
