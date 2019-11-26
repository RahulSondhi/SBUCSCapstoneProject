package com.maroon.mixology.service;

import java.util.List;

import com.maroon.mixology.entity.Equipment;

public interface EquipmentService{
    
    Equipment findByName(String name);

    Boolean existsByName(String name);

    List<Equipment> findAll();

    List<Equipment> findByNameLikeIgnoreCase(String name);

}