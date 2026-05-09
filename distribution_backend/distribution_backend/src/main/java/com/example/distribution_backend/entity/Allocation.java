package com.example.distribution_backend.entity;

import com.example.distribution_backend.enums.AllocationStatus;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "allocations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Allocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ration_card_id")
    private RationCard rationCard;

    @ManyToOne
    @JoinColumn(name = "ration_item_id")
    private RationItem rationItem;

    private Double allocatedQuantity;

    private Integer allocationMonth;

    private Integer allocationYear;

    @Enumerated(EnumType.STRING)
    private AllocationStatus allocationStatus;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}
