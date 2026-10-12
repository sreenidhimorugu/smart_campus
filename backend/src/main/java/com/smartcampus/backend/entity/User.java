package com.smartcampus.backend.entity;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;

@Entity @Table(name="users")
public class User {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false) private String name;
 @Column(nullable=false,unique=true) private String email;
 @JsonIgnore @Column(nullable=false) private String password;
 private String college, branch, skills, interests;
 private Integer year;
 @Enumerated(EnumType.STRING) @Column(nullable=false) private Role role=Role.STUDENT;
 private LocalDateTime createdAt=LocalDateTime.now();
 public User(){}
 public Long getId(){return id;} public void setId(Long v){id=v;}
 public String getName(){return name;} public void setName(String v){name=v;}
 public String getEmail(){return email;} public void setEmail(String v){email=v;}
 public String getPassword(){return password;} public void setPassword(String v){password=v;}
 public String getCollege(){return college;} public void setCollege(String v){college=v;}
 public String getBranch(){return branch;} public void setBranch(String v){branch=v;}
 public String getSkills(){return skills;} public void setSkills(String v){skills=v;}
 public String getInterests(){return interests;} public void setInterests(String v){interests=v;}
 public Integer getYear(){return year;} public void setYear(Integer v){year=v;}
 public Role getRole(){return role;} public void setRole(Role v){role=v;}
 public LocalDateTime getCreatedAt(){return createdAt;} public void setCreatedAt(LocalDateTime v){createdAt=v;}
}
