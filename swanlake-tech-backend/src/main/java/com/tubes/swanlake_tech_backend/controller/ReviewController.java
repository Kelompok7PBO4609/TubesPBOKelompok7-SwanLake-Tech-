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

        if (newReview.getProcessor().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Processor cannot be empty!");
        }

        if (newReview.getProcessorDesc().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Processor Desc cannot be empty!");
        }

        if (newReview.getRam().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Ram cannot be empty!");
        }

        if (newReview.getRamDesc().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Ram Desc cannot be empty!");
        }

        if (newReview.getStorage().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Storage cannot be empty!");
        }

        if (newReview.getStorageDesc().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Storage Desc cannot be empty!");
        }

        if (newReview.getDisplay().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Display cannot be empty!");
        }

        if (newReview.getDisplayDesc().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Display Desc cannot be empty!");
        }

        if (newReview.getBattery().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Battery cannot be empty!");
        }

        if (newReview.getBatteryDesc().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Battery Desc cannot be empty!");
        }

        if (newReview.getCamera().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Camera cannot be empty!");
        }

        if (newReview.getCameraDesc().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Camera Desc cannot be empty!");
        }

        if (newReview.getPrice() == 0) {
            return ResponseEntity.badRequest().body("Error: Price cannot be 0!");
        }

        if (newReview.getReviewText().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: ReviewText cannot be empty!");
        }

        if (newReview.getImageName().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: ImageName cannot be empty!");
        }

        if (newReview.getKeyFeatures().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: KeyFeatures cannot be empty!");
        }

        if (newReview.getPerformance().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Performance cannot be empty!");
        }

        Review savedReview = reviewRepository.save(newReview);
        return ResponseEntity.ok(savedReview);
    }

    @GetMapping("/get/review")
    List<Review> getAllReview() {
        return reviewRepository.findAll();
    }
}