package com.csit321G5.earlytrace.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.csit321G5.earlytrace.entity.Consultation;
import com.csit321G5.earlytrace.service.ConsultationService;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    @Autowired
    private ConsultationService cserv;

    @PostMapping("/createConsultation")
    public Consultation createConsultation(@RequestBody Consultation c) {
        return cserv.createConsultation(c);
    }

    @GetMapping("/getAllConsultations")
    public List<Consultation> getAllConsultations() {
        return cserv.getAllConsultations();
    }

    @GetMapping("/getConsultationById/{consultationId}")
    public Consultation getConsultationById(@PathVariable Long consultationId) {
        return cserv.getConsultationById(consultationId);
    }

    @PutMapping("/updateConsultation/{consultationId}")
    public Consultation updateConsultation(@PathVariable Long consultationId, @RequestBody Consultation c) {
        return cserv.updateConsultation(consultationId, c);
    }

    @DeleteMapping("/deleteConsultation/{consultationId}")
    public String deleteConsultation(@PathVariable Long consultationId) {
        return cserv.deleteConsultation(consultationId);
    }
}
