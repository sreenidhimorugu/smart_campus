package com.smartcampus.backend.controller;
import com.smartcampus.backend.entity.*;
import com.smartcampus.backend.repository.*;
import com.smartcampus.backend.service.OpportunityService;
import com.smartcampus.backend.service.UserService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.Map;
@RestController @RequestMapping("/api/student")
public class StudentController {
 private final UserService users; private final OpportunityService opportunityService; private final OpportunityRepository opportunities; private final SavedOpportunityRepository saved; private final ApplicationRepository apps;
 public StudentController(UserService u,OpportunityService opportunityService,OpportunityRepository o,SavedOpportunityRepository s,ApplicationRepository a){users=u;this.opportunityService=opportunityService;opportunities=o;saved=s;apps=a;}
 @GetMapping({"/opportunities","/opportunities/matched"}) public Object matchedOpportunities(Principal p){return opportunityService.eligibleFor(users.current(p.getName()));}
 @GetMapping("/saved") public Object saved(Principal p){return saved.findByUserId(users.current(p.getName()).getId());}
 @PostMapping("/saved/{id}") public Object save(Principal p,@PathVariable Long id){
  User u=users.current(p.getName()); Opportunity o=opportunities.findById(id).orElseThrow();
  if(!opportunityService.isEligibleFor(u,o))return ResponseEntity.notFound().build();
  if(saved.findByUserIdAndOpportunityId(u.getId(),id).isEmpty()){SavedOpportunity s=new SavedOpportunity();s.setUser(u);s.setOpportunity(o);saved.save(s);}
  return Map.of("message","Opportunity saved");
 }
 @DeleteMapping("/saved/{id}") public Object unsave(Principal p,@PathVariable Long id){saved.deleteByUserIdAndOpportunityId(users.current(p.getName()).getId(),id);return Map.of("message","Opportunity removed");}
 @GetMapping("/applications") public Object applications(Principal p){return apps.findByUserIdOrderByAppliedAtDesc(users.current(p.getName()).getId());}
 @PostMapping("/applications/{id}") public Object apply(Principal p,@PathVariable Long id){
  User u=users.current(p.getName());Opportunity o=opportunities.findById(id).orElseThrow();
  if(!opportunityService.isEligibleFor(u,o))return ResponseEntity.notFound().build();
  Application a=apps.findByUserIdAndOpportunityId(u.getId(),id).orElseGet(()->{Application created=new Application();created.setUser(u);created.setOpportunity(o);return created;});
  a.setStatus(ApplicationStatus.APPLIED);
  apps.save(a);
  return Map.of("message","Application tracked");
 }
 @PutMapping("/applications/{id}/status") public Object status(Principal p,@PathVariable Long id,@RequestParam ApplicationStatus status){
  Application a=apps.findById(id).orElseThrow(); if(!a.getUser().getEmail().equals(p.getName())) return ResponseEntity.status(403).body(Map.of("message","Not allowed"));
  a.setStatus(status);return apps.save(a);
 }
}
