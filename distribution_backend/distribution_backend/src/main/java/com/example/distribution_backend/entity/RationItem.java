package com.example.distribution_backend.entity;

import com.example.distribution_backend.enums.UnitType;

import jakarta.persistence.*;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "ration_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RationItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;

    @Enumerated(EnumType.STRING)
    private UnitType unitType;

    private BigDecimal pricePerUnit;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}