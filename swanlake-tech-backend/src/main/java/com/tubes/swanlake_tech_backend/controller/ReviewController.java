package com.tubes.swanlake_tech_backend.controller;

import com.tubes.swanlake_tech_backend.model.entity.Review;
import com.tubes.swanlake_tech_backend.model.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

        Review savedReview = reviewRepository.save(newReview);
        return ResponseEntity.ok(savedReview);
    }

    @GetMapping("/get/review")
    List<Review> getAllReview() {
        return reviewRepository.findAll();
    }
}
