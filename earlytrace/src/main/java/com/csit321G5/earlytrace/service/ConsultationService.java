package com.csit321G5.earlytrace.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.csit321G5.earlytrace.entity.Consultation;
import com.csit321G5.earlytrace.repository.ConsultationRepository;

@Service
public class ConsultationService {

    @Autowired
    private ConsultationRepository crepo;

    public Consultation createConsultation(Consultation c) {
        return crepo.save(c);
    }

    public List<Consultation> getAllConsultations() {
        return crepo.findAll();
    }

    public Consultation getConsultationById(Long id) {
        return crepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Consultation " + id + " not found"));
    }

    public Consultation updateConsultation(Long id, Consultation newDetails) {
        Consultation c = getConsultationById(id);
        c.setStudentId(newDetails.getStudentId());
        c.setInstructorId(newDetails.getInstructorId());
        c.setCourseId(newDetails.getCourseId());
        c.setScheduledDate(newDetails.getScheduledDate());
        c.setStatus(newDetails.getStatus());
        c.setRemedialPlan(newDetails.getRemedialPlan());
        c.setProgressNotes(newDetails.getProgressNotes());
        return crepo.save(c);
    }

    public String deleteConsultation(Long id) {
        if (!crepo.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Consultation " + id + " not found");
        }
        crepo.deleteById(id);
        return "Consultation " + id + " successfully deleted";
    }
}
