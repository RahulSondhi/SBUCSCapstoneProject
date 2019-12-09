package com.maroon.mixology.repository;

import java.util.List;
import java.util.Optional;

import com.maroon.mixology.entity.Game;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.entity.User;

import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {

    Optional<Game> findById(String id);

    Game findByPlayerAndRecipeAndCompleted(User player, Recipe Recipe, boolean completed);

    List<Game> findByPlayerAndCompleted(User player, boolean completed);


}