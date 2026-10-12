package com.smartcampus.backend.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;
import org.hibernate.validator.constraints.URL;

@Entity @Table(name="opportunities")
public class Opportunity {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank @Column(nullable=false) private String title;
 @Column(nullable=false) private String organization;
 @NotBlank @Column(nullable=false) private String category;
 @Column(length=2000) private String description;
 private String eligibility, skills, location, prize;
 @NotBlank @URL @Pattern(regexp="https?://\\S+") private String officialLink;
 private LocalDate deadline;
 private boolean published=true;
 @ElementCollection(fetch=FetchType.EAGER)
 @CollectionTable(name="opportunity_eligible_years",joinColumns=@JoinColumn(name="opportunity_id"))
 @Column(name="year_level",nullable=false)
 private Set<Integer> eligibleYears=new LinkedHashSet<>();
 @ElementCollection(fetch=FetchType.EAGER)
 @CollectionTable(name="opportunity_eligible_branches",joinColumns=@JoinColumn(name="opportunity_id"))
 @Column(name="branch_name",nullable=false)
 private Set<String> eligibleBranches=new LinkedHashSet<>();
 public Opportunity(){}
 public Long getId(){return id;} public void setId(Long v){id=v;}
 public String getTitle(){return title;} public void setTitle(String v){title=v;}
 public String getOrganization(){return organization;} public void setOrganization(String v){organization=v;}
 public String getCategory(){return category;} public void setCategory(String v){category=v;}
 public String getDescription(){return description;} public void setDescription(String v){description=v;}
 public String getEligibility(){return eligibility;} public void setEligibility(String v){eligibility=v;}
 public String getSkills(){return skills;} public void setSkills(String v){skills=v;}
 public String getLocation(){return location;} public void setLocation(String v){location=v;}
 public String getOfficialLink(){return officialLink;} public void setOfficialLink(String v){officialLink=v;}
 public String getPrize(){return prize;} public void setPrize(String v){prize=v;}
 public LocalDate getDeadline(){return deadline;} public void setDeadline(LocalDate v){deadline=v;}
 public boolean isPublished(){return published;} public void setPublished(boolean v){published=v;}
 public Set<Integer> getEligibleYears(){return eligibleYears;} public void setEligibleYears(Set<Integer> v){eligibleYears=v==null?new LinkedHashSet<>():new LinkedHashSet<>(v);}
 public Set<String> getEligibleBranches(){return eligibleBranches;} public void setEligibleBranches(Set<String> v){eligibleBranches=v==null?new LinkedHashSet<>():new LinkedHashSet<>(v);}
}
