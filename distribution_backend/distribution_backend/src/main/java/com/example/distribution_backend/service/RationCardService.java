package com.example.distribution_backend.service;


import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import com.example.distribution_backend.dto.RationCardRequestDto;
import com.example.distribution_backend.entity.RationCard;
import com.example.distribution_backend.entity.User;
import com.example.distribution_backend.repository.RationCardRepository;
import com.example.distribution_backend.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RationCardService {

    private final RationCardRepository rationCardRepository;
    private final UserRepository userRepository;

    public RationCard createCard(
            RationCardRequestDto dto) {

        User beneficiary = userRepository
                .findById(dto.getBeneficiaryId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Only beneficiary allowed
        if (beneficiary.getRole() != com.example.distribution_backend.enums.Role.BENEFICIARY) {
            throw new RuntimeException(
                    "User is not a beneficiary");
        }

        // One card per beneficiary
        if (rationCardRepository
                .findByBeneficiary(beneficiary)
                .isPresent()) {

            throw new RuntimeException(
                    "Beneficiary already has ration card");
        }

        RationCard card = RationCard.builder()
                .cardNumber(UUID.randomUUID()
                        .toString()
                        .substring(0, 8))
                .beneficiary(beneficiary)
                .familySize(dto.getFamilySize())
                .cardType(dto.getCardType())
                .issueDate(LocalDate.now())
                .status(com.example.distribution_backend.enums.CardStatus.ACTIVE)
                .build();

        return rationCardRepository.save(card);
    }
    public List<RationCard> getAllCards() {

        return rationCardRepository.findAll();
    }
}