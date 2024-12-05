package com.tubes.swanlake_tech_backend.controller;

import com.tubes.swanlake_tech_backend.dto.UserDto;
import com.tubes.swanlake_tech_backend.model.entity.User;
import com.tubes.swanlake_tech_backend.model.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("register")
    public String createUser(@Valid @ModelAttribute UserDto userDto, BindingResult result, Model model) {
        User userEmail = userRepository.findByEmail(userDto.getEmail());
        if (userEmail != null) {
            result.addError(
                    new FieldError("userDto", "email"
                            , "Email address is already used")
            );
        }

        User userUsername = userRepository.findByUsername(userDto.getUsername());
        if (userUsername != null) {
            result.addError(
                    new FieldError("userDto", "username"
                            ,"Username is already used")
            );
        }

        if (result.hasErrors()) {
            return "register";
        }

        try {

            User newUser = new User();
            newUser.setUsername(userDto.getUsername());
            newUser.setEmail(userDto.getEmail());
            newUser.setPassword(userDto.getPassword());

            userRepository.save(newUser);

            model.addAttribute("userDto", new UserDto());
            model.addAttribute("success", true);
        } catch(Exception ex) {
            result.addError(
                    new FieldError("userDto", "username"
                            , ex.getMessage())
            );
        }

        return "register";
    }
}
