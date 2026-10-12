package com.smartcampus.backend.service;
import com.smartcampus.backend.dto.*;
import com.smartcampus.backend.entity.*;
import com.smartcampus.backend.repository.UserRepository;
import com.smartcampus.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Locale;
@Service
public class AuthService {
 private final UserRepository repo; private final PasswordEncoder encoder; private final JwtService jwt;
 public AuthService(UserRepository r,PasswordEncoder e,JwtService j){repo=r;encoder=e;jwt=j;}
 public AuthResponse register(RegisterRequest x){
  String email=x.getEmail().trim().toLowerCase(Locale.ROOT);
  if(repo.existsByEmail(email)) throw new IllegalArgumentException("Email is already registered");
  User u=new User(); u.setName(x.getName().trim());u.setEmail(email);u.setPassword(encoder.encode(x.getPassword()));
  u.setCollege(x.getCollege());u.setBranch(x.getBranch());u.setYear(x.getYear());u.setSkills(x.getSkills());u.setInterests(x.getInterests());
  u.setRole(Role.STUDENT);repo.save(u);return new AuthResponse(jwt.generateToken(u.getEmail(),u.getRole().name()),u.getId(),u.getName(),u.getEmail(),u.getRole().name());
 }
 public AuthResponse login(LoginRequest x){
  User u=repo.findByEmail(x.getEmail().trim().toLowerCase(Locale.ROOT)).orElseThrow(()->new IllegalArgumentException("Invalid email or password"));
  if(!encoder.matches(x.getPassword(),u.getPassword()))throw new IllegalArgumentException("Invalid email or password");
  return new AuthResponse(jwt.generateToken(u.getEmail(),u.getRole().name()),u.getId(),u.getName(),u.getEmail(),u.getRole().name());
 }
}
