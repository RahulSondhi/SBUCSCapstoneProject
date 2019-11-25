package com.maroon.mixology.service;

import java.util.List;

import com.maroon.mixology.entity.Equipment;

public interface EquipmentService{
    
    Equipment findByName(String name);

    List<Equipment> findAll();
}