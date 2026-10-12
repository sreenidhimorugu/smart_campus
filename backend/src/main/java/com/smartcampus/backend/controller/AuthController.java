package com.smartcampus.backend.controller;
import com.smartcampus.backend.dto.*;
import com.smartcampus.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/auth")
public class AuthController {
 private final AuthService service; public AuthController(AuthService s){service=s;}
 @PostMapping("/register") public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest r){try{return ResponseEntity.ok(service.register(r));}catch(Exception e){return ResponseEntity.badRequest().body(java.util.Map.of("message",e.getMessage()));}}
 @PostMapping("/login") public ResponseEntity<?> login(@Valid @RequestBody LoginRequest r){try{return ResponseEntity.ok(service.login(r));}catch(Exception e){return ResponseEntity.status(401).body(java.util.Map.of("message",e.getMessage()));}}
}
