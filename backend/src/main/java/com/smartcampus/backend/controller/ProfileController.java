package com.smartcampus.backend.controller;
import com.smartcampus.backend.dto.StudentProfileResponse;
import com.smartcampus.backend.dto.StudentProfileUpdateRequest;
import com.smartcampus.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
@RestController @RequestMapping("/api/profile")
public class ProfileController {
 private final UserService service; public ProfileController(UserService s){service=s;}
 @GetMapping public StudentProfileResponse get(Principal p){return StudentProfileResponse.from(service.current(p.getName()));}
 @PutMapping public StudentProfileResponse update(Principal p,@Valid @RequestBody StudentProfileUpdateRequest x){return StudentProfileResponse.from(service.update(p.getName(),x));}
}
