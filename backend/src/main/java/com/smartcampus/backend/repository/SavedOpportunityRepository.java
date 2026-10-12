package com.smartcampus.backend.repository;
import com.smartcampus.backend.entity.SavedOpportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
public interface SavedOpportunityRepository extends JpaRepository<SavedOpportunity,Long> {
 List<SavedOpportunity> findByUserId(Long userId);
 Optional<SavedOpportunity> findByUserIdAndOpportunityId(Long userId,Long opportunityId);
 @Transactional
 void deleteByUserIdAndOpportunityId(Long userId,Long opportunityId);
}
