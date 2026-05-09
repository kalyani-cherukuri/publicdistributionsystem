package com.example.distribution_backend.controller;

import com.example.distribution_backend.dto.DistributionRequestDto;
import com.example.distribution_backend.entity.DistributionTransaction;
import com.example.distribution_backend.service.DistributionService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/distributions")
@RequiredArgsConstructor
public class DistributionController {

    private final DistributionService distributionService;

    // SHOP_MANAGER only
    @PreAuthorize("hasRole('SHOP_MANAGER')")
    @PostMapping
    public DistributionTransaction distribute(
            @RequestBody DistributionRequestDto dto) {

        return distributionService.distribute(dto);
    }

    // ADMIN + SHOP_MANAGER
    @PreAuthorize(
            "hasAnyRole('ADMIN','SHOP_MANAGER')")
    @GetMapping
    public List<DistributionTransaction>
    getAllTransactions() {

        return distributionService.getAllTransactions();
    }
}