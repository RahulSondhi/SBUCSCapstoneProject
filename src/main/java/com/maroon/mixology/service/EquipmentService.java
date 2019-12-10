package com.maroon.mixology.service;

import java.util.List;

import com.maroon.mixology.entity.Equipment;
import com.maroon.mixology.repository.EquipmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipmentService {
    @Autowired
    private EquipmentRepository equipmentRepository;

    public Equipment findByName(String name) {
        return equipmentRepository.findByName(name);
    }

	public List<Equipment> findAll() {
        return equipmentRepository.findAll();
	}

    public List<Equipment> findByNameLikeIgnoreCase(String name) {
        return equipmentRepository.findByNameLikeIgnoreCase(name);
    }

    public Boolean existsByName(String name) {
        return equipmentRepository.existsByName(name);
    }

}