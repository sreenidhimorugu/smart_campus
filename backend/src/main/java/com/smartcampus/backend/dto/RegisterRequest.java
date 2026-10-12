package com.smartcampus.backend.dto;
import jakarta.validation.constraints.*;
public class RegisterRequest {
 @NotBlank private String name; @Email @NotBlank private String email; @NotBlank @Size(min=8) private String password;
 @NotBlank private String college,branch; private String skills,interests;
 @NotNull @Min(1) @Max(4) private Integer year;
 public String getName(){return name;} public void setName(String v){name=v;}
 public String getEmail(){return email;} public void setEmail(String v){email=v;}
 public String getPassword(){return password;} public void setPassword(String v){password=v;}
 public String getCollege(){return college;} public void setCollege(String v){college=v;}
 public String getBranch(){return branch;} public void setBranch(String v){branch=v;}
 public String getSkills(){return skills;} public void setSkills(String v){skills=v;}
 public String getInterests(){return interests;} public void setInterests(String v){interests=v;}
 public Integer getYear(){return year;} public void setYear(Integer v){year=v;}
}
