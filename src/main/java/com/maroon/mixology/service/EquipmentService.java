package com.maroon.mixology.service;

import com.maroon.mixology.entity.Equipment;

public interface EquipmentService{
    
    Equipment findByName(String name);

}