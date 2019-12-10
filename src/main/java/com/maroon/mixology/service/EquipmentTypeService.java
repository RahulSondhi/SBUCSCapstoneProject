package com.maroon.mixology.service;

import java.util.List;

import com.maroon.mixology.entity.EquipmentType;
import com.maroon.mixology.repository.EquipmentTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipmentTypeService{
    @Autowired
    private EquipmentTypeRepository equipmentTypeRepository;

    public EquipmentType findByName(String name) {
        return equipmentTypeRepository.findByName(name);
    }

	public List<EquipmentType> findAll() {
        return equipmentTypeRepository.findAll();
	}

}