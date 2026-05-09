package com.example.distribution_backend.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.distribution_backend.entity.Inventory;
import com.example.distribution_backend.entity.RationItem;

import java.util.Optional;

public interface InventoryRepository
        extends JpaRepository<Inventory, Long> {

    Optional<Inventory> findByRationItem(
            RationItem rationItem);
}