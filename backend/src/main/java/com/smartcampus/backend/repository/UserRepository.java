package com.smartcampus.backend.repository;
import com.smartcampus.backend.entity.User;
import com.smartcampus.backend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface UserRepository extends JpaRepository<User,Long> {
 Optional<User> findByEmail(String email);
 boolean existsByEmail(String email);
 long countByRole(Role role);
}
