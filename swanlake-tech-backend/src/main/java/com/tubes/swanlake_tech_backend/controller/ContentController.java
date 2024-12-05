package com.tubes.swanlake_tech_backend.controller;

import com.tubes.swanlake_tech_backend.dto.UserDto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContentController {

    @GetMapping({"/login"})
    public String goToLogin() {
        return "login";
    }

    @GetMapping("/register")
    public String goToRegister(Model model) {
        UserDto userDto = new UserDto();
        model.addAttribute("userDto", userDto);
        model.addAttribute("success", false);
        return "register";
    }
}
