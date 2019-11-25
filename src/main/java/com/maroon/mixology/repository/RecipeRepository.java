package com.maroon.mixology.repository;

import java.util.List;
import java.util.Optional;

import com.maroon.mixology.entity.Recipe;

import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {

    Optional<Recipe> findById(String id);

    Recipe findByName(String name);

    List<Recipe> findByNameLikeIgnoreCase(String name);

}