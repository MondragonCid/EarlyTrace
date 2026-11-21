package com.csit321G5.earlytrace.controller;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
 
import com.csit321G5.earlytrace.entity.RiskScore;
import com.csit321G5.earlytrace.service.RiskScoreService;
 
@RestController
@RequestMapping("/api/riskscores")
public class RiskScoreController {
 
    @Autowired
    private RiskScoreService rserv;
 
    @PostMapping("/postRiskScore")
    public RiskScore createRiskScore(@RequestBody RiskScore r) {
        return rserv.createRiskScore(r);
    }
 
    @GetMapping("/getAllRiskScores")
    public List<RiskScore> getAllRiskScores() {
        return rserv.getAllRiskScores();
    }
 
    @GetMapping("/getRiskScoreById/{riskScoreId}")
    public RiskScore getRiskScoreById(@PathVariable Long riskScoreId) {
        return rserv.getRiskScoreById(riskScoreId);
    }
 
    @PutMapping("/updateRiskScore/{riskScoreId}")
    public RiskScore updateRiskScore(@PathVariable Long riskScoreId, @RequestBody RiskScore r) {
        return rserv.updateRiskScore(riskScoreId, r);
    }
 
    @DeleteMapping("/deleteRiskScore/{riskScoreId}")
    public String deleteRiskScore(@PathVariable Long riskScoreId) {
        return rserv.deleteRiskScore(riskScoreId);
    }
}