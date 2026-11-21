package com.csit321G5.earlytrace.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "consultations")
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consultation_id")
    private Long consultationId;

    /* 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_consultation_student"))
    @JsonIgnore
    private User student;
    */

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    /*
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_consultation_instructor"))
    @JsonIgnore
    private User instructor;
    */

    @Column(name = "instructor_id", nullable = false)
    private Long instructorId;
    
    /*
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_consultation_course"))
    @JsonIgnore
    private Course course;
    */

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @Column(nullable = false)
    private LocalDate flaggedDate;

    private LocalDateTime scheduledDate;

    @Column(nullable = false)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String remedialPlan;

    @Column(columnDefinition = "TEXT")
    private String progressNotes;

    @PrePersist
    protected void onCreate() {
        this.flaggedDate = LocalDate.now();
    }

    public Long getConsultationId() { return consultationId; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getInstructorId() { return instructorId; }
    public void setInstructorId(Long instructorId) { this.instructorId = instructorId; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public LocalDate getFlaggedDate() { return flaggedDate; }

    public LocalDateTime getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(LocalDateTime scheduledDate) { this.scheduledDate = scheduledDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRemedialPlan() { return remedialPlan; }
    public void setRemedialPlan(String remedialPlan) { this.remedialPlan = remedialPlan; }

    public String getProgressNotes() { return progressNotes; }
    public void setProgressNotes(String progressNotes) { this.progressNotes = progressNotes; }
}
