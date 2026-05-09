package com.example.distribution_backend.service;

import com.example.distribution_backend.dto.AllocationRequestDto;

import com.example.distribution_backend.entity.*;

import com.example.distribution_backend.enums.*;

import com.example.distribution_backend.repository.*;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AllocationService {

    private final AllocationRepository allocationRepository;

    private final RationCardRepository rationCardRepository;

    private final RationItemRepository rationItemRepository;

    private final InventoryRepository inventoryRepository;

    public Allocation createAllocation(
            AllocationRequestDto dto) {

        RationCard card = rationCardRepository
                .findById(dto.getRationCardId())
                .orElseThrow(() ->
                        new RuntimeException("Card not found"));

        RationItem item = rationItemRepository
                .findById(dto.getRationItemId())
                .orElseThrow(() ->
                        new RuntimeException("Item not found"));

        // Card must be ACTIVE
        if (card.getStatus() != CardStatus.ACTIVE) {

            throw new RuntimeException(
                    "Ration card is not active");
        }

        Inventory inventory = inventoryRepository
                .findByRationItem(item)
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found"));

        // Inventory check
        if (inventory.getStatus()
                == InventoryStatus.OUT_OF_STOCK) {

            throw new RuntimeException(
                    "Item out of stock");
        }

        // Allocation logic
        double quantity = calculateAllocation(
                card,
                item
        );

        // Check available stock
        if (inventory.getQuantityAvailable()
                < quantity) {

            throw new RuntimeException(
                    "Insufficient stock");
        }

        // Reduce inventory
        inventory.setQuantityAvailable(
                inventory.getQuantityAvailable() - quantity
        );

        // Auto update inventory status
        if (inventory.getQuantityAvailable() <= 0) {

            inventory.setStatus(
                    InventoryStatus.OUT_OF_STOCK);

        } else if (inventory.getQuantityAvailable() < 50) {

            inventory.setStatus(
                    InventoryStatus.LOW_STOCK);
        }

        inventoryRepository.save(inventory);

        Allocation allocation = Allocation.builder()
                .rationCard(card)
                .rationItem(item)
                .allocatedQuantity(quantity)
                .allocationMonth(
                        LocalDate.now().getMonthValue()
                )
                .allocationYear(
                        LocalDate.now().getYear()
                )
                .allocationStatus(
                        AllocationStatus.ALLOCATED
                )
                .build();

        return allocationRepository.save(allocation);
    }

    // Business logic
    private double calculateAllocation(
            RationCard card,
            RationItem item) {

        String itemName =
                item.getItemName().toLowerCase();

        // Example only for rice
        if (itemName.equals("rice")) {

            switch (card.getCardType()) {

                case APL:
                    return 5 * card.getFamilySize();

                case BPL:
                    return 10 * card.getFamilySize();

                case AAY:
                    return 20;
            }
        }

        return 5;
    }
    public List<Allocation> getAllAllocations() {

    return allocationRepository.findAll();
}
}