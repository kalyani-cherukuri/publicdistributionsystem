package com.example.distribution_backend.dto;

import com.example.distribution_backend.enums.CardType;

import lombok.Data;

@Data
public class RationCardRequestDto {

    private Long beneficiaryId;

    private Integer familySize;

    private CardType cardType;
}