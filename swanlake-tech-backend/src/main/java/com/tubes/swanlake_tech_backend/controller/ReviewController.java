package com.tubes.swanlake_tech_backend.controller;

import com.tubes.swanlake_tech_backend.model.entity.Review;
import com.tubes.swanlake_tech_backend.model.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ReviewController {
    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping("/post/review")
    public ResponseEntity<?> newReview(@RequestBody Review newReview) {

        if (newReview.getProductName().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Product Name cannot be empty!");
        }

        if (reviewRepository.findByProductName(newReview.getProductName()).isPresent()){
            return ResponseEntity.badRequest().body("Error: Product Name is already taken!");
        }

        if (newReview.getProductType().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Product Type cannot be empty!");
        }

        if (newReview.getReviewTitle().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Review Title cannot be empty!");
        }

        Review savedReview = reviewRepository.save(newReview);
        return ResponseEntity.ok(savedReview);
    }

    @GetMapping("/get/review")
    List<Review> getAllReview() {
        return reviewRepository.findAll();
    }

    @GetMapping("/get/review/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        return reviewRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


}