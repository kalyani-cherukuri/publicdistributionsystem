package com.example.distribution_backend.controller;



import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import com.example.distribution_backend.dto.RationCardRequestDto;
import com.example.distribution_backend.entity.RationCard;
import com.example.distribution_backend.service.RationCardService;

@RestController
@RequestMapping("/api/ration-cards")
@RequiredArgsConstructor
public class RationCardController {

    private final RationCardService rationCardService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public RationCard createCard(
            @RequestBody RationCardRequestDto dto) {

        return rationCardService.createCard(dto);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<RationCard> getAllCards() {

        return rationCardService.getAllCards();
    }
}