package com.example.distribution_backend.entity;

import com.example.distribution_backend.enums.CardStatus;
import com.example.distribution_backend.enums.CardType;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "ration_cards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RationCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String cardNumber;

    @OneToOne
    @JoinColumn(name = "beneficiary_id")
    private User beneficiary;

    private Integer familySize;

    @Enumerated(EnumType.STRING)
    private CardType cardType;

    private LocalDate issueDate;

    @Enumerated(EnumType.STRING)
    private CardStatus status;
}
