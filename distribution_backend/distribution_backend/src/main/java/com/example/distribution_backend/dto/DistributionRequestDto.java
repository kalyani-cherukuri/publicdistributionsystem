package com.example.distribution_backend.dto;

import lombok.Data;

@Data
public class DistributionRequestDto {

    private Long allocationId;

    private Double distributedQuantity;
}