package com.csit321G5.earlytrace.service;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
 
import com.csit321G5.earlytrace.entity.RiskScore;
import com.csit321G5.earlytrace.repository.RiskScoreRepository;
 
@Service
public class RiskScoreService {
 
    @Autowired
    private RiskScoreRepository rrepo;
 
    public RiskScore createRiskScore(RiskScore r) {
        return rrepo.save(r);
    }
 
    public List<RiskScore> getAllRiskScores() {
        return rrepo.findAll();
    }
 
    public RiskScore getRiskScoreById(Long id) {
        return rrepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "RiskScore " + id + " not found"));
    }
 
    public RiskScore updateRiskScore(Long id, RiskScore newDetails) {
        RiskScore r = getRiskScoreById(id);
        r.setStudentId(newDetails.getStudentId());
        r.setCourseId(newDetails.getCourseId());
        r.setAcademicMasteryScore(newDetails.getAcademicMasteryScore());
        r.setSubmissionConsistencyScore(newDetails.getSubmissionConsistencyScore());
        r.setCompositeRiskScore(newDetails.getCompositeRiskScore());
        r.setRiskTier(newDetails.getRiskTier());
        return rrepo.save(r);
    }
 
    public String deleteRiskScore(Long id) {
        if (!rrepo.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "RiskScore " + id + " not found");
        }
        rrepo.deleteById(id);
        return "RiskScore " + id + " successfully deleted";
    }
}