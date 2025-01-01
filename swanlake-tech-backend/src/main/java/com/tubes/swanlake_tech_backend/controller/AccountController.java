package com.tubes.swanlake_tech_backend.controller;

import com.tubes.swanlake_tech_backend.dto.ReqRes;
import com.tubes.swanlake_tech_backend.model.entity.Account;
import com.tubes.swanlake_tech_backend.model.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class AccountController {
    @Autowired
    private AccountRepository accountRepository;

    // Get all accounts
    @GetMapping("/get/account")
    public ResponseEntity<ReqRes> getAllAccounts() {
        List<Account> accountList = accountRepository.findAll();
        ReqRes response = new ReqRes();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Accounts retrieved successfully");
        response.setAccountList(accountList);
        return ResponseEntity.ok(response);
    }

    // Get account by ID
    @GetMapping("/get/account/{id}")
    public ResponseEntity<ReqRes> getAccountById(@PathVariable Long id) {
        return accountRepository.findById(id)
                .map(account -> {
                    ReqRes response = new ReqRes();
                    response.setStatusCode(HttpStatus.OK.value());
                    response.setMessage("Account retrieved successfully");
                    response.setAccount(account);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    ReqRes response = new ReqRes();
                    response.setStatusCode(HttpStatus.NOT_FOUND.value());
                    response.setError("Account not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    // Update account by ID
    @PutMapping("/put/account/{id}")
    public ResponseEntity<ReqRes> updateAccount(@PathVariable Long id, @RequestBody ReqRes request) {
        return accountRepository.findById(id)
                .map(existingAccount -> {
                    // Update fields only if provided
                    if (request.getName() != null && !request.getName().isBlank()) {
                        existingAccount.setName(request.getName());
                    }
                    if (request.getEmail() != null && !request.getEmail().isBlank()) {
                        existingAccount.setEmail(request.getEmail());
                    }
                    if (request.getRole() != null && !request.getRole().isBlank()) {
                        existingAccount.setRole(request.getRole());
                    }
                    if (request.getPassword() != null && !request.getPassword().isBlank()) {
                        existingAccount.setPassword(request.getPassword());
                    }

                    // Save the updated account
                    Account savedAccount = accountRepository.save(existingAccount);

                    // Prepare response
                    ReqRes response = new ReqRes();
                    response.setStatusCode(HttpStatus.OK.value());
                    response.setMessage("Account updated successfully");
                    response.setAccount(savedAccount);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    ReqRes response = new ReqRes();
                    response.setStatusCode(HttpStatus.NOT_FOUND.value());
                    response.setError("Account not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }
}
