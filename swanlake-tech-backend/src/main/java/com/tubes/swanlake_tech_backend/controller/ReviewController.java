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

    @DeleteMapping("/delete/review/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        return reviewRepository.findById(id)
                .map(review -> {
                    reviewRepository.delete(review);
                    return ResponseEntity.ok().body("Review with ID " + id + " has been deleted successfully.");
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Error: Review with ID " + id + " not found."));
    }

    @PutMapping("/put/review/{id}")
    public ResponseEntity<?> updateReview(@PathVariable Long id, @RequestBody Review updatedReview) {
        return reviewRepository.findById(id)
                .map(existingReview -> {
                    // Validasi
                    if (updatedReview.getProductName().isEmpty()) {
                        return ResponseEntity.badRequest().body("Error: Product Name cannot be empty!");
                    }

                    if (reviewRepository.findByProductName(updatedReview.getProductName()).isPresent() &&
                            !existingReview.getProductName().equals(updatedReview.getProductName())) {
                        return ResponseEntity.badRequest().body("Error: Product Name is already taken!");
                    }

                    if (updatedReview.getProductType().isEmpty()) {
                        return ResponseEntity.badRequest().body("Error: Product Type cannot be empty!");
                    }

                    if (updatedReview.getReviewTitle().isEmpty()) {
                        return ResponseEntity.badRequest().body("Error: Review Title cannot be empty!");
                    }

                    // Set semua field
                    existingReview.setProductName(updatedReview.getProductName());
                    existingReview.setProductType(updatedReview.getProductType());
                    existingReview.setReviewTitle(updatedReview.getReviewTitle());
                    existingReview.setCardDesc(updatedReview.getCardDesc());
                    existingReview.setProcessor(updatedReview.getProcessor());
                    existingReview.setProcessorDesc(updatedReview.getProcessorDesc());
                    existingReview.setRam(updatedReview.getRam());
                    existingReview.setRamDesc(updatedReview.getRamDesc());
                    existingReview.setStorage(updatedReview.getStorage());
                    existingReview.setStorageDesc(updatedReview.getStorageDesc());
                    existingReview.setDisplay(updatedReview.getDisplay());
                    existingReview.setDisplayDesc(updatedReview.getDisplayDesc());
                    existingReview.setBattery(updatedReview.getBattery());
                    existingReview.setBatteryDesc(updatedReview.getBatteryDesc());
                    existingReview.setCamera(updatedReview.getCamera());
                    existingReview.setCameraDesc(updatedReview.getCameraDesc());
                    existingReview.setPrice(updatedReview.getPrice());
                    existingReview.setReviewText(updatedReview.getReviewText());
                    existingReview.setImageName(updatedReview.getImageName());
                    existingReview.setRating(updatedReview.getRating());
                    existingReview.setKeyFeatures(updatedReview.getKeyFeatures());
                    existingReview.setPerformance(updatedReview.getPerformance());

                    // Simpan perubahan
                    Review savedReview = reviewRepository.save(existingReview);
                    return ResponseEntity.ok(savedReview);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Error: Review with ID " + id + " not found."));
    }
}