package com.example.distribution_backend.controller;


import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import com.example.distribution_backend.entity.Allocation;
import com.example.distribution_backend.entity.DistributionTransaction;
import com.example.distribution_backend.entity.RationCard;
import com.example.distribution_backend.service.BeneficiaryService;

import java.util.List;

@RestController
@RequestMapping("/api/beneficiary")
@RequiredArgsConstructor
public class BeneficiaryController {

    private final BeneficiaryService beneficiaryService;

    // My ration card
    @PreAuthorize("hasRole('BENEFICIARY')")
    @GetMapping("/my-card")
    public RationCard getMyCard(
            Authentication authentication) {

        return beneficiaryService.getMyCard(
                authentication.getName()
        );
    }

    // My allocations
    @PreAuthorize("hasRole('BENEFICIARY')")
    @GetMapping("/my-allocations")
    public List<Allocation> getMyAllocations(
            Authentication authentication) {

        return beneficiaryService.getMyAllocations(
                authentication.getName()
        );
    }

    // My distributions
    @PreAuthorize("hasRole('BENEFICIARY')")
    @GetMapping("/my-distributions")
    public List<DistributionTransaction>
    getMyDistributions(
            Authentication authentication) {

        return beneficiaryService.getMyDistributions(
                authentication.getName()
        );
    }
}