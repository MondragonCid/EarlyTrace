package com.csit321G5.earlytrace.repository;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import com.csit321G5.earlytrace.entity.RiskScore;
 
@Repository
public interface RiskScoreRepository extends JpaRepository<RiskScore, Long> {
 
}
 