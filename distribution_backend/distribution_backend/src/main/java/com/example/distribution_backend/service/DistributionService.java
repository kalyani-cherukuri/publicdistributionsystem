package com.example.distribution_backend.service;

import com.example.distribution_backend.dto.DistributionRequestDto;

import com.example.distribution_backend.entity.*;

import com.example.distribution_backend.enums.*;

import com.example.distribution_backend.repository.*;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DistributionService {

    private final DistributionTransactionRepository
            transactionRepository;

    private final AllocationRepository
            allocationRepository;

    public DistributionTransaction distribute(
            DistributionRequestDto dto) {

        Allocation allocation = allocationRepository
                .findById(dto.getAllocationId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Allocation not found"));

        // Already distributed
        if (allocation.getAllocationStatus()
                == AllocationStatus.DISTRIBUTED) {

            throw new RuntimeException(
                    "Allocation already distributed");
        }

        // Get previous distributions
        List<DistributionTransaction> transactions =
                transactionRepository
                        .findByAllocationId(
                                allocation.getId());

        double alreadyDistributed = transactions
                .stream()
                .filter(t ->
                        t.getTransactionStatus()
                                == TransactionStatus.SUCCESS)
                .mapToDouble(
                        DistributionTransaction
                                ::getDistributedQuantity)
                .sum();

        double remaining =
                allocation.getAllocatedQuantity()
                        - alreadyDistributed;

        // Prevent excess distribution
        if (dto.getDistributedQuantity()
                > remaining) {

            throw new RuntimeException(
                    "Distribution exceeds allocation");
        }

        DistributionTransaction transaction =
                DistributionTransaction.builder()
                        .allocation(allocation)
                        .distributedQuantity(
                                dto.getDistributedQuantity())
                        .transactionStatus(
                                TransactionStatus.SUCCESS)
                        .referenceId(
                                UUID.randomUUID()
                                        .toString()
                                        .substring(0, 8))
                        .build();

        // Update allocation status
        double totalDistributed =
                alreadyDistributed
                        + dto.getDistributedQuantity();

        if (totalDistributed
                == allocation.getAllocatedQuantity()) {

            allocation.setAllocationStatus(
                    AllocationStatus.DISTRIBUTED);

        } else {

            allocation.setAllocationStatus(
                    AllocationStatus
                            .PARTIALLY_DISTRIBUTED);
        }

        allocationRepository.save(allocation);

        return transactionRepository.save(transaction);
    }

    // View transactions
    public List<DistributionTransaction>
    getAllTransactions() {

        return transactionRepository.findAll();
    }
}
