package com.smartcampus.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.URL;

import java.util.Set;

public record OpportunityPostRequest(
        @NotBlank String title,
        @NotBlank
        @Pattern(regexp = "Internship|Hackathon|Coding Competition|Workshop|Course|Certification|Project Challenge|Other")
        String category,
        @NotBlank @URL @Pattern(regexp = "https?://\\S+") String officialLink,
        @NotEmpty Set<@NotNull @Min(1) @Max(4) Integer> eligibleYears,
        @NotEmpty Set<@NotBlank @Pattern(regexp = "CSE|AI & ML|Data Science|ECE|EEE|Mechanical|Civil|Other") String> eligibleBranches) {
}
