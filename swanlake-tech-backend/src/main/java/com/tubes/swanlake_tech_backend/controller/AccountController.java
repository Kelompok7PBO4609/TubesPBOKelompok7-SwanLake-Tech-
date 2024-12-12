package com.tubes.swanlake_tech_backend.controller;

import com.tubes.swanlake_tech_backend.model.entity.Account;
import com.tubes.swanlake_tech_backend.model.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class AccountController {
    @Autowired
    private AccountRepository accountRepository;

    @GetMapping("/accounts")
    List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }
}