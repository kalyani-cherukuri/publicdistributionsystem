package com.example.distribution_backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.distribution_backend.dto.UserRequestDto;
import com.example.distribution_backend.entity.User;
import com.example.distribution_backend.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public User createUser(@Valid @RequestBody UserRequestDto dto) {
        return userService.createUser(dto);
    }
    @PreAuthorize("hasAnyRole('ADMIN','SHOP_MANAGER')")
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}