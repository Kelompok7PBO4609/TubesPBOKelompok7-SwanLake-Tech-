package com.tubes.swanlake_tech_backend.controller;

import com.tubes.swanlake_tech_backend.model.entity.User;
import com.tubes.swanlake_tech_backend.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserAPIController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/post/user")
    public ResponseEntity<?> newUser(@RequestBody User newUser) {
        // Check if username or email already exists
        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already registered!");
        }
        User savedUser = userRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/get/user")
    public List<User> getAllUser() {
        return userRepository.findAll();
    }
}
