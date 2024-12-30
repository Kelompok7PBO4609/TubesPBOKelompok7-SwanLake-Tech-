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

    public ReqRes register(ReqRes registrationRequest){
        ReqRes resp = new ReqRes();

        try {
            Account account = new Account();
            account.setEmail(registrationRequest.getEmail());
            account.setRole(registrationRequest.getRole());
            account.setUsername(registrationRequest.getUsername());
            account.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            Account ourUsersResult = accountRepository.save(account);
            if (ourUsersResult.getAccountID()>0) {
                resp.setAccount((ourUsersResult));
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }

        }catch (Exception e){
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
                if (reqRes.getUsername() != null) {
                    existingUser.setUsername(reqRes.getUsername());
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
