package com.tubes.swanlake_tech_backend.model.repository;

import com.tubes.swanlake_tech_backend.model.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByProductName(String ProductName);
}
