package com.tubes.swanlake_tech_backend.model.repository;

import com.tubes.swanlake_tech_backend.model.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);
}
