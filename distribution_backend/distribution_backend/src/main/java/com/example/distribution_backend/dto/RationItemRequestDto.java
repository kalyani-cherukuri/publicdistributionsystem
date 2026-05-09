package com.example.distribution_backend.dto;

import com.example.distribution_backend.enums.UnitType;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class RationItemRequestDto {

    private String itemName;

    private UnitType unitType;

    private BigDecimal pricePerUnit;
}