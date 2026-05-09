package com.example.distribution_backend.repository;

import com.example.distribution_backend.entity.RationCard;
import com.example.distribution_backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RationCardRepository
        extends JpaRepository<RationCard, Long> {

    Optional<RationCard> findByBeneficiary(User user);
}