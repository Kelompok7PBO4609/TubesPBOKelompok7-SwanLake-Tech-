package com.tubes.swanlake_tech_backend.controller;

import com.tubes.swanlake_tech_backend.dto.UserDto;
import com.tubes.swanlake_tech_backend.model.entity.User;
import com.tubes.swanlake_tech_backend.model.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login/register")
    public String createUser(@Valid @ModelAttribute UserDto userDto, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "login/register";
        }

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());

        userRepository.save(user);

        return "redirect:/login?success=true";
    }
}
