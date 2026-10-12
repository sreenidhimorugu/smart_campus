package com.smartcampus.backend.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity @Table(name="applications",uniqueConstraints=@UniqueConstraint(columnNames={"user_id","opportunity_id"}))
public class Application {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(optional=false) private User user;
 @ManyToOne(optional=false) private Opportunity opportunity;
 @Enumerated(EnumType.STRING) private ApplicationStatus status=ApplicationStatus.INTERESTED;
 private LocalDateTime appliedAt=LocalDateTime.now();
 public Application(){}
 public Long getId(){return id;} public User getUser(){return user;} public void setUser(User v){user=v;}
 public Opportunity getOpportunity(){return opportunity;} public void setOpportunity(Opportunity v){opportunity=v;}
 public ApplicationStatus getStatus(){return status;} public void setStatus(ApplicationStatus v){status=v;}
 public LocalDateTime getAppliedAt(){return appliedAt;} public void setAppliedAt(LocalDateTime v){appliedAt=v;}
}
