package com.maroon.mixology.repository;

import java.util.List;
import java.util.Optional;

import com.maroon.mixology.entity.Bar;

import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface BarRepository extends MongoRepository<Bar, String> {

    Optional<Bar> findById(String id);

    Bar findByName(String name);

    List<Bar> findByNameLikeIgnoreCase(String name);

}