package com.example.distribution_backend.service;
import com.example.distribution_backend.entity.*;

import com.example.distribution_backend.repository.*;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BeneficiaryService {

    private final UserRepository userRepository;

    private final RationCardRepository
            rationCardRepository;

    private final AllocationRepository
            allocationRepository;

    private final DistributionTransactionRepository
            transactionRepository;

    // Get my ration card
    public RationCard getMyCard(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));

        return rationCardRepository
                .findByBeneficiary(user)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Ration card not found"));
    }

    // Get my allocations
    public List<Allocation>
    getMyAllocations(String email) {

        RationCard card = getMyCard(email);

        return allocationRepository
                .findByRationCard(card);
    }

    // Get my distributions
    public List<DistributionTransaction>
    getMyDistributions(String email) {

        RationCard card = getMyCard(email);

        List<Allocation> allocations =
                allocationRepository
                        .findByRationCard(card);

        return allocations.stream()

                .flatMap(allocation ->

                        transactionRepository
                                .findByAllocationId(
                                        allocation.getId())
                                .stream()
                )

                .toList();
    }
}