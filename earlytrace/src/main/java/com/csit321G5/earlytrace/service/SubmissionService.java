package com.csit321G5.earlytrace.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csit321G5.earlytrace.entity.Submission;
import com.csit321G5.earlytrace.repository.SubmissionRepository;

@Service 
public class SubmissionService {
    @Autowired 
    private SubmissionRepository srepo;

    public Submission postSubmission(Submission s) {
        return srepo.save(s);
    } 

    public List<Submission> getAllSubmissions() {
        return srepo.findAll();
    }

    public Optional<Submission> getSubmissionById(Long submissionId) {
        return srepo.findById(submissionId);
    }

    public Submission putSubmission(Long id, Submission newDetails) {
        Submission s = srepo.findById(id).get();
        s.setAssessmentId(newDetails.getAssessmentId());
        s.setStudentId(newDetails.getStudentId());
        s.setScoreObtained(newDetails.getScoreObtained());
        s.setSubmissionStatus(newDetails.getSubmissionStatus());
        
        return srepo.save(s);
    }

    public String deleteSubmission(Long submissionId) {
        String msg = "";

        if(srepo.existsById(submissionId)) {
            srepo.deleteById(submissionId);
            msg = "Submission " + submissionId + " successfully deleted";
        } else {
            msg = "Error: Submission " + submissionId + " not found";
        }

        return msg;
    }

}
