package com.maroon.mixology.repository;

import java.util.List;

import com.maroon.mixology.entity.Equipment;

import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface EquipmentRepository extends MongoRepository<Equipment, String> {

    Equipment findByName(String name);

    Boolean existsByName(String name);

    List<Equipment> findByNameLikeIgnoreCase(String name);

    List<Equipment> findAll();
}