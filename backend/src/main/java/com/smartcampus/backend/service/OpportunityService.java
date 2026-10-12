package com.smartcampus.backend.service;
import com.smartcampus.backend.entity.Opportunity;
import com.smartcampus.backend.entity.User;
import com.smartcampus.backend.dto.OpportunityPostRequest;
import com.smartcampus.backend.repository.OpportunityRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Locale;
@Service
public class OpportunityService {
 private final OpportunityRepository repo; public OpportunityService(OpportunityRepository r){repo=r;}
 public List<Opportunity> search(String k,String c){return repo.search(k==null?"":k,c==null?"":c);}
 public List<Opportunity> all(){return repo.findAll();}
 public Opportunity get(Long id){return repo.findById(id).orElseThrow(()->new IllegalArgumentException("Opportunity not found"));}
 public Opportunity save(Opportunity o){if(o.getOrganization()==null||o.getOrganization().isBlank())o.setOrganization("External opportunity");return repo.save(o);}
 public Opportunity create(OpportunityPostRequest request){
  Opportunity opportunity=new Opportunity();
  opportunity.setTitle(request.title().trim());
  opportunity.setCategory(request.category());
  opportunity.setOfficialLink(request.officialLink().trim());
  opportunity.setEligibleYears(request.eligibleYears());
  opportunity.setEligibleBranches(request.eligibleBranches());
  opportunity.setOrganization("External opportunity");
  opportunity.setDescription("");
  opportunity.setPublished(true);
  return repo.save(opportunity);
 }
 public Opportunity update(Long id,OpportunityPostRequest request){
  Opportunity opportunity=get(id);
  opportunity.setTitle(request.title().trim());
  opportunity.setCategory(request.category());
  opportunity.setOfficialLink(request.officialLink().trim());
  opportunity.setEligibleYears(request.eligibleYears());
  opportunity.setEligibleBranches(request.eligibleBranches());
  opportunity.setPublished(true);
  return repo.save(opportunity);
 }
 public List<Opportunity> eligibleFor(User student){
  if(student.getYear()==null||student.getBranch()==null||student.getBranch().isBlank())return List.of();
  return repo.findByPublishedTrueOrderByIdDesc().stream()
          .filter(opportunity->isEligible(student,opportunity))
          .toList();
 }
 public List<Opportunity> searchEligibleFor(User student,String keyword,String category){
  String normalizedKeyword=keyword==null?"":keyword.trim().toLowerCase(Locale.ROOT);
  String normalizedCategory=category==null?"":category.trim().toLowerCase(Locale.ROOT);
  return eligibleFor(student).stream()
          .filter(opportunity->normalizedKeyword.isEmpty()||opportunity.getTitle().toLowerCase(Locale.ROOT).contains(normalizedKeyword))
          .filter(opportunity->normalizedCategory.isEmpty()||opportunity.getCategory().equalsIgnoreCase(normalizedCategory))
          .toList();
 }
 public boolean isEligibleFor(User student,Opportunity opportunity){
  if(student.getYear()==null||student.getBranch()==null||student.getBranch().isBlank())return false;
  String studentBranch=normalizeBranch(student.getBranch());
  return opportunity.isPublished()
          &&opportunity.getEligibleYears().contains(student.getYear())
          &&opportunity.getEligibleBranches().stream().map(OpportunityService::normalizeBranch).anyMatch(studentBranch::equals);
 }
 private boolean isEligible(User student,Opportunity opportunity){return isEligibleFor(student,opportunity);}
 private static String normalizeBranch(String branch){
  String normalized=branch.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]","");
  return switch(normalized){
   case "ai","aiml","artificialintelligence","artificialintelligenceandmachinelearning"->"aiml";
   case "cse","computerscience","computerscienceengineering"->"cse";
   case "datascience","ds"->"datascience";
   case "ece","electronicsandcommunication","electronicsandcommunicationengineering"->"ece";
   case "eee","electricalandelectronics","electricalandelectronicsengineering"->"eee";
   case "mechanicalengineering"->"mechanical";
   case "civilengineering"->"civil";
   default->normalized;
  };
 }
 public void delete(Long id){repo.deleteById(id);}
}
