package com.example.distribution_backend.service;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import com.example.distribution_backend.dto.RationItemRequestDto;
import com.example.distribution_backend.entity.RationItem;
import com.example.distribution_backend.repository.RationItemRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RationItemService {

    private final RationItemRepository rationItemRepository;

    // Add item
    public RationItem addItem(
            RationItemRequestDto dto) {

        RationItem item = RationItem.builder()
                .itemName(dto.getItemName())
                .unitType(dto.getUnitType())
                .pricePerUnit(dto.getPricePerUnit())
                .build();

        return rationItemRepository.save(item);
    }

    // Get all items
    public List<RationItem> getAllItems() {
        return rationItemRepository.findAll();
    }

    // Update price
    public RationItem updatePrice(
            Long id,
            RationItemRequestDto dto) {

        RationItem item = rationItemRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Item not found"));

        item.setPricePerUnit(dto.getPricePerUnit());

        return rationItemRepository.save(item);
    }
}