package com.maroon.mixology.repository;

import java.util.List;

import com.maroon.mixology.entity.Unit;

import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface UnitRepository extends MongoRepository<Unit, String> {

    Unit findByName(String name);

    List<Unit> findAll();
}