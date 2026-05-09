package com.example.distribution_backend.entity;

import com.example.distribution_backend.enums.InventoryStatus;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "inventory")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ration_item_id")
    private RationItem rationItem;

    private Double quantityAvailable;

    private LocalDateTime lastUpdated;

    @ManyToOne
    @JoinColumn(name = "managed_by")
    private User managedBy;

    @Enumerated(EnumType.STRING)
    private InventoryStatus status;

    @PrePersist
    public void prePersist() {
        lastUpdated = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        lastUpdated = LocalDateTime.now();
    }
}