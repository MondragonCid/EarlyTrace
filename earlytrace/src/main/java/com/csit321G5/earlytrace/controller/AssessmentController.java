package com.csit321G5.earlytrace.controller;

import com.csit321G5.earlytrace.entity.Assessment;
import com.csit321G5.earlytrace.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    // CREATE
    @PostMapping
    public ResponseEntity<Assessment> createAssessment(@RequestBody Assessment assessment) {
        Assessment created = assessmentService.createAssessment(assessment);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // READ all (optionally filtered: /api/assessments?courseId=1)
    @GetMapping
    public List<Assessment> getAllAssessments(@RequestParam(required = false) Long courseId) {
        if (courseId != null) {
            return assessmentService.getAssessmentsByCourse(courseId);
        }
        return assessmentService.getAllAssessments();
    }

    // READ one
    @GetMapping("/{id}")
    public ResponseEntity<Assessment> getAssessmentById(@PathVariable Long id) {
        return assessmentService.getAssessmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Assessment> updateAssessment(@PathVariable Long id,
                                                       @RequestBody Assessment details) {
        return assessmentService.updateAssessment(id, details)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssessment(@PathVariable Long id) {
        if (assessmentService.deleteAssessment(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Return 400 with the message when validation fails
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
