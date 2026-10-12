package com.smartcampus.backend.service;
import com.smartcampus.backend.entity.User;
import com.smartcampus.backend.dto.StudentProfileUpdateRequest;
import com.smartcampus.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
@Service
public class UserService {
 private final UserRepository repo; public UserService(UserRepository r){repo=r;}
 public User current(String email){return repo.findByEmail(email).orElseThrow();}
 public User update(String email,StudentProfileUpdateRequest x){User u=current(email);u.setName(x.name());u.setCollege(x.college());u.setBranch(x.branch());u.setYear(x.year());u.setSkills(x.skills());u.setInterests(x.interests());return repo.save(u);}
}
