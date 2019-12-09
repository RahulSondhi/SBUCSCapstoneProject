package com.maroon.mixology.service;

import java.util.List;

import com.maroon.mixology.entity.Game;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.entity.User;
import com.maroon.mixology.repository.GameRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    /* Our custom method to overrule Optional*/
    public Game findById(String id) {
        if(gameRepository.findById(id).isEmpty()){
            return null;
        }
        return gameRepository.findById(id).get();
    }

    public Game findByPlayerAndRecipeAndCompleted(User player, Recipe recipe, boolean completed) {
        return gameRepository.findByPlayerAndRecipeAndCompleted(player, recipe, completed);
    }

    public List<Game> findByPlayerAndIsCompleted(User player) {
        return gameRepository.findByPlayerAndCompleted(player, true);
    }
    public List<Game> findByPlayerAndIsNotCompleted(User player) {
        return gameRepository.findByPlayerAndCompleted(player, false);
    }

}