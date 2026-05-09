package com.example.distribution_backend.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import com.example.distribution_backend.dto.InventoryRequestDto;
import com.example.distribution_backend.entity.Inventory;
import com.example.distribution_backend.service.InventoryService;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    // SHOP_MANAGER only
    @PreAuthorize("hasRole('SHOP_MANAGER')")
    @PostMapping
    public Inventory saveInventory(
            @RequestBody InventoryRequestDto dto) {

        return inventoryService.saveInventory(dto);
    }

    // ADMIN + SHOP_MANAGER
    @PreAuthorize(
            "hasAnyRole('ADMIN','SHOP_MANAGER')")
    @GetMapping
    public List<Inventory> getAllInventory() {

        return inventoryService.getAllInventory();
    }
}