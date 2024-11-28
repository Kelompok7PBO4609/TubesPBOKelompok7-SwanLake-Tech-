package com.tubes.swanlake_tech_backend.model.repository;

import com.tubes.swanlake_tech_backend.model.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}
