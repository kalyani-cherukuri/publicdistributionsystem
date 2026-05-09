package com.example.distribution_backend.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.distribution_backend.entity.Allocation;
import com.example.distribution_backend.entity.RationCard;

public interface AllocationRepository
        extends JpaRepository<Allocation, Long> {
            List<Allocation> findByRationCard(
        RationCard rationCard);
}