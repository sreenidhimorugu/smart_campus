package com.smartcampus.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record StudentProfileUpdateRequest(
        @NotBlank String name,
        @NotBlank String college,
        @NotBlank String branch,
        @NotNull @Min(1) @Max(4) Integer year,
        String skills,
        String interests) {
}
