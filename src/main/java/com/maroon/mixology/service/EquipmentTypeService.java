package com.maroon.mixology.service;

import java.util.List;

import com.maroon.mixology.entity.EquipmentType;

public interface EquipmentTypeService{
    
    EquipmentType findByName(String name);

    List<EquipmentType> findAll();
}