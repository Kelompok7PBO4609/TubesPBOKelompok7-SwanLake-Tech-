package com.tubes.swanlake_tech_backend.controller;

import com.tubes.swanlake_tech_backend.model.entity.Admin;
import com.tubes.swanlake_tech_backend.model.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.regex.Pattern;

@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;

    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9]{3,}$");

    @PostMapping("/post/admin")
    public ResponseEntity<?> newAdmin(@RequestBody Admin newAdmin) {
        // Validasi username
        if (newAdmin.getUsername().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Username cannot be empty!");
        }
        if (!USERNAME_PATTERN.matcher(newAdmin.getUsername()).matches()) {
            return ResponseEntity.badRequest().body("Error: Username must be at least 3 characters long, contain no spaces, and alphanumeric!");
        }

        // Validasi password
        if (newAdmin.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Password cannot be empty!");
        }

        // Validasi username unik
        if (adminRepository.findByUsername(newAdmin.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        // Enkripsi password
        try {
            String encryptedPassword = encryptPassword(newAdmin.getPassword());
            newAdmin.setPassword(encryptedPassword);
        } catch (NoSuchAlgorithmException e) {
            return ResponseEntity.status(500).body("Error: Unable to encrypt password.");
        }

        newAdmin.setRole("ADMIN");
        Admin savedAdmin = adminRepository.save(newAdmin);
        return ResponseEntity.ok(savedAdmin);
    }

    @GetMapping("/get/admin")
    public List<Admin> getAllAdmin() {
        return adminRepository.findAll();
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
