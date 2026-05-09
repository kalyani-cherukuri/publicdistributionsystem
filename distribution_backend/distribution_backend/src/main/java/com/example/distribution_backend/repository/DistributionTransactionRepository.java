package com.example.distribution_backend.repository;

import com.example.distribution_backend.entity.DistributionTransaction;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DistributionTransactionRepository
        extends JpaRepository<
                DistributionTransaction,
                Long> {

    List<DistributionTransaction>
    findByAllocationId(Long allocationId);
}