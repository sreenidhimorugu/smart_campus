package com.smartcampus.backend.repository;
import com.smartcampus.backend.entity.Opportunity;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface OpportunityRepository extends JpaRepository<Opportunity,Long> {
 List<Opportunity> findByPublishedTrueOrderByIdDesc();
 java.util.Optional<Opportunity> findByTitleIgnoreCase(String title);
 @Query("select o from Opportunity o where o.published=true and (:k='' or lower(o.title) like lower(concat('%',:k,'%')) or lower(o.organization) like lower(concat('%',:k,'%')) or lower(o.skills) like lower(concat('%',:k,'%'))) and (:c='' or lower(o.category)=lower(:c)) order by o.deadline asc")
 List<Opportunity> search(@Param("k") String keyword,@Param("c") String category);
}
