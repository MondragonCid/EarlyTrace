package com.csit321G5.earlytrace.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.csit321G5.earlytrace.entity.Submission;
import com.csit321G5.earlytrace.service.SubmissionService;
import org.springframework.web.bind.annotation.*;




@RestController 
@RequestMapping(path="/api/submissions")
public class SubmissionController {
    @Autowired 
    private SubmissionService sserv;

    @PostMapping("/postSubmission")
    public Submission postSubmission(@RequestBody Submission s) {
        return sserv.postSubmission(s);
    }

    @GetMapping("/getAllSubmissions")
    public List<Submission> getMethodName() {
        return sserv.getAllSubmissions();
    }

    @GetMapping("/getSubmissionById/{submissionId}")
    public Optional<Submission> getSubmissionById(@PathVariable Long submissionId) {
        return sserv.getSubmissionById(submissionId);
    }

    @PutMapping("/putSubmission/{submissionId}")
    public Submission putSubmission(@PathVariable Long submissionId, @RequestBody Submission s) {
        return sserv.putSubmission(submissionId, s);
    }

    @DeleteMapping("/deleteSubmission/{submissionId}")
    public String deleteSubmission(@PathVariable Long submissionId) {
        return sserv.deleteSubmission(submissionId);
    }
    
    

}
