package com.example.distribution_backend.repository;

import com.example.distribution_backend.entity.RationItem;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RationItemRepository
        extends JpaRepository<RationItem, Long> {
}