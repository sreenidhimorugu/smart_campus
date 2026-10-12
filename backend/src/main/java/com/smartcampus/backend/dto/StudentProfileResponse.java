package com.smartcampus.backend.dto;

import com.smartcampus.backend.entity.User;

public record StudentProfileResponse(
        Long id,
        String name,
        String email,
        String college,
        String branch,
        Integer year,
        String skills,
        String interests) {
    public static StudentProfileResponse from(User user) {
        return new StudentProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCollege(),
                user.getBranch(),
                user.getYear(),
                user.getSkills(),
                user.getInterests());
    }
}
