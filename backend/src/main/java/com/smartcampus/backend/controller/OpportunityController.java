package com.smartcampus.backend.controller;
import com.smartcampus.backend.service.OpportunityService;
import com.smartcampus.backend.service.UserService;
import com.smartcampus.backend.entity.Role;
import java.security.Principal;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/opportunities")
public class OpportunityController {
 private final OpportunityService service; private final UserService users; public OpportunityController(OpportunityService s,UserService users){service=s;this.users=users;}
 @GetMapping("/public") public Object search(Principal p,@RequestParam(defaultValue="") String keyword,@RequestParam(defaultValue="") String category){
  var user=users.current(p.getName());
  return user.getRole()==Role.STUDENT?service.searchEligibleFor(user,keyword,category):service.search(keyword,category);
 }
 @GetMapping("/{id}") public ResponseEntity<?> get(Principal p,@PathVariable Long id){try{var opportunity=service.get(id);var user=users.current(p.getName());if(user.getRole()==Role.STUDENT&&!service.isEligibleFor(user,opportunity))return ResponseEntity.notFound().build();return ResponseEntity.ok(opportunity);}catch(Exception e){return ResponseEntity.notFound().build();}}
}
