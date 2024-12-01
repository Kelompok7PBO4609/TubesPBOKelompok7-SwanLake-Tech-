package com.tubes.swanlake_tech_backend.service;

import com.tubes.swanlake_tech_backend.model.entity.Admin;
import com.tubes.swanlake_tech_backend.model.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    private AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }
}