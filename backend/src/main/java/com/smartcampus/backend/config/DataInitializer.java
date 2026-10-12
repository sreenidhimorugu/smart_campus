package com.smartcampus.backend.config;

import com.smartcampus.backend.entity.Opportunity;
import com.smartcampus.backend.entity.Role;
import com.smartcampus.backend.entity.User;
import com.smartcampus.backend.repository.OpportunityRepository;
import com.smartcampus.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.LinkedHashSet;
import java.util.Optional;

@Configuration
public class DataInitializer {
 private static final List<Integer> ALL_YEARS=List.of(1,2,3,4);
 private static final List<String> ALL_BRANCHES=List.of("CSE","AI & ML","Data Science","ECE","EEE","Mechanical","Civil","Other");

 @Bean
 CommandLineRunner seed(UserRepository users,OpportunityRepository opportunities,PasswordEncoder encoder){
  return args->{
   if(!users.existsByEmail("admin@smartcampus.com")){
    User admin=new User();
    admin.setName("Smart Campus Admin");
    admin.setEmail("admin@smartcampus.com");
    admin.setPassword(encoder.encode("Admin@123"));
    admin.setRole(Role.ADMIN);
    users.save(admin);
   }

   seedOpportunity(opportunities,"Smart India Hackathon (SIH)","Hackathon",
           "https://www.sih.gov.in/","Government of India","Open to students across branches to build innovative solutions for real-world problem statements.",
           ALL_YEARS,ALL_BRANCHES,"AI/ML Hackathon","Smart Campus Demo");
   seedOpportunity(opportunities,"NPTEL Online Certification Courses","Course",
           "https://nptel.ac.in/","NPTEL","Online courses and certifications across engineering, science, and interdisciplinary subjects.",
           ALL_YEARS,ALL_BRANCHES,null,null);
   seedOpportunity(opportunities,"AI & Machine Learning Internship","Internship",
           "https://internship.aicte-india.org/","AICTE Internship Portal","Explore AI and machine learning internship opportunities through the official AICTE internship portal.",
           List.of(2,3,4),List.of("AI & ML","CSE","Data Science"),null,null);
   seedOpportunity(opportunities,"Java Full Stack Development Internship","Internship",
           "https://internship.aicte-india.org/","AICTE Internship Portal","Explore software and full stack internship opportunities through the official AICTE internship portal.",
           List.of(2,3,4),List.of("CSE","AI & ML","Data Science","ECE"),"Java Full Stack Internship","Demo Technology Company");
   seedOpportunity(opportunities,"AI & Machine Learning Hackathon","Hackathon",
           "https://unstop.com/hackathons","Unstop","Discover AI and machine learning hackathons and participate through the organizer's official event page.",
           List.of(2,3,4),List.of("AI & ML","CSE","Data Science"),null,null);
   seedOpportunity(opportunities,"Cloud Computing Certification","Certification",
           "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/","Microsoft Learn","Prepare for the Azure Fundamentals certification and learn core cloud concepts.",
           List.of(2,3,4),List.of("CSE","AI & ML","Data Science","ECE"),null,null);
   seedOpportunity(opportunities,"Full Stack Web Development Workshop","Workshop",
           "https://skillsbuild.org/","IBM SkillsBuild","Explore guided technology learning and web development training resources.",
           ALL_YEARS,List.of("CSE","AI & ML","Data Science","ECE"),null,null);
  };
 }

 private static void seedOpportunity(OpportunityRepository repository,String title,String type,String link,
                                     String organization,String description,List<Integer> years,List<String> branches,
                                     String legacyTitle,String legacyOrganization){
  Optional<Opportunity> existing=repository.findByTitleIgnoreCase(title);
  if(existing.isEmpty()&&legacyTitle!=null){
   existing=repository.findByTitleIgnoreCase(legacyTitle)
           .filter(opportunity->legacyOrganization.equalsIgnoreCase(opportunity.getOrganization()))
           .filter(opportunity->opportunity.getEligibleYears().isEmpty()&&opportunity.getEligibleBranches().isEmpty());
   existing.ifPresent(opportunity->opportunity.setTitle(title));
  }

  Opportunity opportunity=existing.orElseGet(Opportunity::new);
  boolean isNew=opportunity.getId()==null;
  if(isNew||opportunity.getEligibleYears().isEmpty()||opportunity.getEligibleBranches().isEmpty()){
   opportunity.setTitle(title);
   opportunity.setCategory(type);
   opportunity.setOfficialLink(link);
   opportunity.setOrganization(organization);
   opportunity.setDescription(description);
   opportunity.setEligibleYears(new LinkedHashSet<>(years));
   opportunity.setEligibleBranches(new LinkedHashSet<>(branches));
   opportunity.setPublished(true);
   repository.save(opportunity);
  }
 }
}
