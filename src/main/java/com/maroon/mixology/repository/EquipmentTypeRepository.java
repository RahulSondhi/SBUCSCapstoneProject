package com.maroon.mixology.repository;

import java.util.List;

import com.maroon.mixology.entity.EquipmentType;

import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface EquipmentTypeRepository extends MongoRepository<EquipmentType, String> {

    EquipmentType findByName(String name);

    List<EquipmentType> findAll();
}