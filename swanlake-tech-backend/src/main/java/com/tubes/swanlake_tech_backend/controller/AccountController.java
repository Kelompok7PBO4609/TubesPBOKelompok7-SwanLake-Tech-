package com.tubes.swanlake_tech_backend.controller;

import com.tubes.swanlake_tech_backend.model.entity.Account;
import com.tubes.swanlake_tech_backend.model.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.regex.Pattern;

@RestController
@CrossOrigin("http://localhost:3000")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9]{3,}$");
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");

    // BCryptPasswordEncoder untuk enkripsi password
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/post/user")
    public ResponseEntity<?> newUser(@RequestBody Account newUser) {
        // Validasi username
        if (newUser.getUsername().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Username cannot be empty!");
        }
        if (!USERNAME_PATTERN.matcher(newUser.getUsername()).matches()) {
            return ResponseEntity.badRequest().body("Error: Username must be at least 3 characters long, contain no spaces, and alphanumeric!");
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
        if (accountRepository.findByUsername(newUser.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        if (accountRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already registered!");
        }

        // Enkripsi password menggunakan BCrypt
        String encryptedPassword = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(encryptedPassword);

        // Set default role
        newUser.setRole("USER");

        // Simpan user
        Account savedUser = accountRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/get/user")
    public List<Account> getAllUser() {
        return accountRepository.findAll();
    }
}
