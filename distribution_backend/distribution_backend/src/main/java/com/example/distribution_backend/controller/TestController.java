package com.example.distribution_backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String admin() {
        return "Admin Access";
    }

    @GetMapping("/manager")
    @PreAuthorize("hasRole('SHOP_MANAGER')")
    public String manager() {
        return "Manager Access";
    }

    @GetMapping("/beneficiary")
    @PreAuthorize("hasRole('BENEFICIARY')")
    public String beneficiary() {
        return "Beneficiary Access";
    }
}