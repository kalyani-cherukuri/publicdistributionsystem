package com.example.distribution_backend.controller;


import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import com.example.distribution_backend.dto.AllocationRequestDto;
import com.example.distribution_backend.entity.Allocation;
import com.example.distribution_backend.service.AllocationService;

@RestController
@RequestMapping("/api/allocations")
@RequiredArgsConstructor
public class AllocationController {

    private final AllocationService allocationService;

    // ADMIN only
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Allocation createAllocation(
            @RequestBody AllocationRequestDto dto) {

        return allocationService.createAllocation(dto);
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'SHOP_MANAGER')")
    @GetMapping
    public List<Allocation> getAllAllocations() {

        return allocationService.getAllAllocations();
    }
}
