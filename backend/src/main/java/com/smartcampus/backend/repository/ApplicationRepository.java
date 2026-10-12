package com.smartcampus.backend.repository;
import com.smartcampus.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface ApplicationRepository extends JpaRepository<Application,Long> {
 List<Application> findByUserIdOrderByAppliedAtDesc(Long userId);
 Optional<Application> findByUserIdAndOpportunityId(Long userId,Long opportunityId);
}
