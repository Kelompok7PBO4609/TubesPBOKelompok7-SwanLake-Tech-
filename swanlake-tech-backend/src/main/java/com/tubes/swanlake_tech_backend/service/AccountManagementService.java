package com.tubes.swanlake_tech_backend.service;

import com.tubes.swanlake_tech_backend.dto.ReqRes;
import com.tubes.swanlake_tech_backend.model.entity.Account;
import com.tubes.swanlake_tech_backend.model.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class AccountManagementService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ReqRes register(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();

        try {
            // Validate username
            if (registrationRequest.getName() == null || registrationRequest.getName().isEmpty()) {
                resp.setStatusCode(400);
                resp.setMessage("Username cannot be empty");
                return resp;
            }
            if (!Pattern.matches("^[a-zA-Z0-9]{3,}$", registrationRequest.getName())) {
                resp.setStatusCode(400);
                resp.setMessage("Username must be at least 3 characters and only alphanumeric");
                return resp;
            }

            // Validate email
            if (registrationRequest.getEmail() == null || registrationRequest.getEmail().isEmpty()) {
                resp.setStatusCode(400);
                resp.setMessage("Email cannot be empty");
                return resp;
            }
            if (!Pattern.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", registrationRequest.getEmail())) {
                resp.setStatusCode(400);
                resp.setMessage("Invalid email format");
                return resp;
            }

            // Validate password
            if (registrationRequest.getPassword() == null || registrationRequest.getPassword().isEmpty()) {
                resp.setStatusCode(400);
                resp.setMessage("Password cannot be empty");
                return resp;
            }
            if (!Pattern.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{6,}$",
                    registrationRequest.getPassword())) {
                resp.setStatusCode(400);
                resp.setMessage("Password must be at least 6 characters long, containing at least one uppercase letter, " +
                        "one lowercase letter, one digit, and one special character");
                return resp;
            }

            // Check if email already exists
            if (accountRepository.findByEmail(registrationRequest.getEmail()).isPresent()) {
                resp.setStatusCode(400);
                resp.setMessage("Email already in use");
                return resp;
            }

            // Check if username already exists
            if (accountRepository.findByName(registrationRequest.getName()).isPresent()) {
                resp.setStatusCode(400);
                resp.setMessage("Username already in use");
                return resp;
            }

            // Save the user
            Account account = new Account();
            account.setEmail(registrationRequest.getEmail());
            account.setRole(registrationRequest.getRole());
            account.setName(registrationRequest.getName());
            account.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

            Account ourUsersResult = accountRepository.save(account);
            if (ourUsersResult.getAccountID() > 0) {
                resp.setAccount(ourUsersResult);
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }

        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }


    public ReqRes login(ReqRes loginRequest){
        ReqRes response = new ReqRes();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                            loginRequest.getPassword()));
            var user = accountRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully Logged In");

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public ReqRes refreshToken(ReqRes refreshTokenReqiest){
        ReqRes response = new ReqRes();
        try{
            String ourEmail = jwtUtils.extractUsername(refreshTokenReqiest.getToken());
            Account account = accountRepository.findByEmail(ourEmail).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), account)) {
                var jwt = jwtUtils.generateToken(account);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenReqiest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully Refreshed Token");
            }
            response.setStatusCode(200);
            return response;

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    public ReqRes getAllUsers() {
        ReqRes reqRes = new ReqRes();

        try {
            List<Account> result = accountRepository.findAll();
            if (!result.isEmpty()) {
                reqRes.setAccountList(result);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("No users found");
            }
            return reqRes;
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
            return reqRes;
        }
    }

    public ReqRes getUsersById(Long id) {
        ReqRes reqRes = new ReqRes();
        try {
            Account usersById = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            reqRes.setAccount(usersById);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes deleteUser(Long userId) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Account> userOptional = accountRepository.findById(userId);
            if (userOptional.isPresent()) {
                accountRepository.deleteById(userId);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User deleted succesfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes updateUser(Long userId, ReqRes reqRes) {
        ReqRes resp = new ReqRes();
        try {
            Optional<Account> userOptional = accountRepository.findById(userId);
            if (userOptional.isPresent()) {
                Account existingUser = userOptional.get();

                // Update only non-null fields
                if (reqRes.getEmail() != null) {
                    existingUser.setEmail(reqRes.getEmail());
                }
                if (reqRes.getName() != null) {
                    existingUser.setName(reqRes.getName());
                }
                if (reqRes.getRole() != null) {
                    existingUser.setRole(reqRes.getRole());
                }
                if (reqRes.getPassword() != null && !reqRes.getPassword().isEmpty()) {
                    existingUser.setPassword(passwordEncoder.encode(reqRes.getPassword()));
                }

                Account savedUser = accountRepository.save(existingUser);
                resp.setAccount(savedUser);
                resp.setStatusCode(200);
                resp.setMessage("User updated successfully");
            } else {
                resp.setStatusCode(404);
                resp.setMessage("User not found for update");
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return resp;
    }

    public ReqRes getMyInfo(String email){
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Account> userOptional = accountRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                reqRes.setAccount(userOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return reqRes;
    }
}
