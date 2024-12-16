package com.tubes.swanlake_tech_backend.controller;

import com.tubes.swanlake_tech_backend.model.entity.Admin;
import com.tubes.swanlake_tech_backend.model.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/post/admin")

    @GetMapping("/get/admin")
    public List<Admin> getAllAdmin() {
        return adminRepository.findAll();
    }
}
