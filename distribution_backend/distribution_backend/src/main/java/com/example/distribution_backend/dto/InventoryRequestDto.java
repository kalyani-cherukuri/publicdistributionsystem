package com.example.distribution_backend.dto;
import lombok.Data;

@Data
public class InventoryRequestDto {

    private Long rationItemId;

    private Double quantityAvailable;

    private Long managedById;
}