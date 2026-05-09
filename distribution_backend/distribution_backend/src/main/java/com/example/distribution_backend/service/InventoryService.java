package com.example.distribution_backend.service;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import com.example.distribution_backend.dto.InventoryRequestDto;
import com.example.distribution_backend.entity.Inventory;
import com.example.distribution_backend.entity.RationItem;
import com.example.distribution_backend.entity.User;
import com.example.distribution_backend.enums.InventoryStatus;
import com.example.distribution_backend.enums.Role;
import com.example.distribution_backend.repository.InventoryRepository;
import com.example.distribution_backend.repository.RationItemRepository;
import com.example.distribution_backend.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    private final RationItemRepository rationItemRepository;

    private final UserRepository userRepository;

    // Create or update inventory
    public Inventory saveInventory(
            InventoryRequestDto dto) {

        RationItem item = rationItemRepository
                .findById(dto.getRationItemId())
                .orElseThrow(() ->
                        new RuntimeException("Item not found"));

        User manager = userRepository
                .findById(dto.getManagedById())
                .orElseThrow(() ->
                        new RuntimeException("Manager not found"));

        // Validate role
        if (manager.getRole() != Role.SHOP_MANAGER) {
            throw new RuntimeException(
                    "User is not shop manager");
        }

        Inventory inventory = inventoryRepository
                .findByRationItem(item)
                .orElse(new Inventory());

        inventory.setRationItem(item);

        inventory.setQuantityAvailable(
                dto.getQuantityAvailable());

        inventory.setManagedBy(manager);

        // Auto inventory status
        if (dto.getQuantityAvailable() <= 0) {

            inventory.setStatus(
                    InventoryStatus.OUT_OF_STOCK);

        } else if (dto.getQuantityAvailable() < 50) {

            inventory.setStatus(
                    InventoryStatus.LOW_STOCK);

        } else {

            inventory.setStatus(
                    InventoryStatus.AVAILABLE);
        }

        return inventoryRepository.save(inventory);
    }

    // Get all inventory
    public List<Inventory> getAllInventory() {

        return inventoryRepository.findAll();
    }
}