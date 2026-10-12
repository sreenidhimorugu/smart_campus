package com.smartcampus.backend.controller;
import com.smartcampus.backend.repository.*;
import com.smartcampus.backend.dto.OpportunityPostRequest;
import com.smartcampus.backend.entity.Role;
import com.smartcampus.backend.service.OpportunityService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController @RequestMapping("/api/admin")
public class AdminController {
 private final OpportunityService service; private final OpportunityRepository opp; private final UserRepository users; private final ApplicationRepository apps;
 public AdminController(OpportunityService s,OpportunityRepository o,UserRepository u,ApplicationRepository a){service=s;opp=o;users=u;apps=a;}
 @GetMapping("/dashboard") public Object dashboard(){return Map.of("students",users.countByRole(Role.STUDENT),"opportunities",opp.count(),"applications",apps.count());}
 @GetMapping("/opportunities") public Object all(){return service.all();}
 @PostMapping("/opportunities") public Object create(@Valid @RequestBody OpportunityPostRequest request){return service.create(request);}
 @PutMapping("/opportunities/{id}") public Object update(@PathVariable Long id,@Valid @RequestBody OpportunityPostRequest request){return service.update(id,request);}
 @DeleteMapping("/opportunities/{id}") public Object delete(@PathVariable Long id){service.delete(id);return Map.of("message","Opportunity deleted");}
 @GetMapping("/students") public Object students(){return users.findAll().stream().map(u->Map.of("id",u.getId(),"name",u.getName(),"email",u.getEmail(),"role",u.getRole().name())).toList();}
 @GetMapping("/applications") public Object applications(){return apps.findAll();}
}
