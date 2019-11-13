package com.maroon.mixology.service;

import com.maroon.mixology.entity.Equipment;
import com.maroon.mixology.repository.EquipmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipmentServiceImpl implements EquipmentService {
    @Autowired
    private EquipmentRepository equipmentRepository;

    @Override
    public Equipment findByName(String name) {
        return equipmentRepository.findByName(name);
    }

}