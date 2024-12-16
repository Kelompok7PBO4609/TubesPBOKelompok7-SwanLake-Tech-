package com.tubes.swanlake_tech_backend.controller;

import com.tubes.swanlake_tech_backend.model.entity.User;
import com.tubes.swanlake_tech_backend.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.regex.Pattern;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9]{3,}$");
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");

    @PostMapping("/post/user")
    public ResponseEntity<?> newUser(@RequestBody User newUser) {
        // Validasi username
        if (newUser.getUsername().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Username cannot be empty!");
        }
        if (!USERNAME_PATTERN.matcher(newUser.getUsername()).matches()) {
            return ResponseEntity.badRequest().body("Error: Username must be at least 3 characters long and alphanumeric!");
        }

        // Validasi email
        if (newUser.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Email cannot be empty!");
        }
        if (!EMAIL_PATTERN.matcher(newUser.getEmail()).matches()) {
            return ResponseEntity.badRequest().body("Error: Email format is invalid!");
        }

        // Validasi password
        if (newUser.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Password cannot be empty!");
        }

        // Validasi username dan email unik
        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already registered!");
        }

        // Enkripsi password
        try {
            String encryptedPassword = encryptPassword(newUser.getPassword());
            newUser.setPassword(encryptedPassword);
        } catch (NoSuchAlgorithmException e) {
            return ResponseEntity.status(500).body("Error: Unable to encrypt password.");
        }

        newUser.setRole("USER");
        User savedUser = userRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/get/user")
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    private String encryptPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hash = md.digest(password.getBytes());
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
