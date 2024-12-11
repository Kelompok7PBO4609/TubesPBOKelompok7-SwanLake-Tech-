package com.tubes.swanlake_tech_backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContentController {

    @GetMapping({"/login"})
    public String goToLogin() {
        return "login";
    }

}
