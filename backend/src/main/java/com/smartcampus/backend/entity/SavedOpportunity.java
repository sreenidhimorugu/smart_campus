package com.smartcampus.backend.entity;
import jakarta.persistence.*;
@Entity @Table(name="saved_opportunities",uniqueConstraints=@UniqueConstraint(columnNames={"user_id","opportunity_id"}))
public class SavedOpportunity {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(optional=false) private User user;
 @ManyToOne(optional=false) private Opportunity opportunity;
 public SavedOpportunity(){}
 public Long getId(){return id;} public User getUser(){return user;} public void setUser(User v){user=v;}
 public Opportunity getOpportunity(){return opportunity;} public void setOpportunity(Opportunity v){opportunity=v;}
}
