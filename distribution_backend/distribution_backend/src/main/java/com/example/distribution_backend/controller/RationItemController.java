package com.example.distribution_backend.controller;


import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import com.example.distribution_backend.dto.RationItemRequestDto;
import com.example.distribution_backend.entity.RationItem;
import com.example.distribution_backend.service.RationItemService;

import java.util.List;

@RestController
@RequestMapping("/api/ration-items")
@RequiredArgsConstructor
public class RationItemController {

    private final RationItemService rationItemService;

    // ADMIN only
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public RationItem addItem(
            @RequestBody RationItemRequestDto dto) {

        return rationItemService.addItem(dto);
    }

    // ADMIN + SHOP_MANAGER
    @PreAuthorize(
            "hasAnyRole('ADMIN','SHOP_MANAGER')")
    @GetMapping
    public List<RationItem> getAllItems() {

        return rationItemService.getAllItems();
    }

    // ADMIN only
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public RationItem updatePrice(
            @PathVariable Long id,
            @RequestBody RationItemRequestDto dto) {

        return rationItemService.updatePrice(id, dto);
    }
}