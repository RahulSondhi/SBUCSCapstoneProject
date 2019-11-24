package com.maroon.mixology.service;

import java.util.List;

import com.maroon.mixology.entity.EquipmentType;
import com.maroon.mixology.repository.EquipmentTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipmentTypeServiceImpl implements EquipmentTypeService {
    @Autowired
    private EquipmentTypeRepository equipmentTypeRepository;

    @Override
    public EquipmentType findByName(String name) {
        return equipmentTypeRepository.findByName(name);
    }

	@Override
	public List<EquipmentType> findAll() {
        return equipmentTypeRepository.findAll();
	}

}