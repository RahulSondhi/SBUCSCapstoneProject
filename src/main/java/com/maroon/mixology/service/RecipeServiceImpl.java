package com.maroon.mixology.service;

import java.util.NoSuchElementException;

import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.repository.RecipeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeServiceImpl implements RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    /* Our custom method to overrule Optional*/
    public Recipe findById(String id) throws NoSuchElementException {
        return recipeRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Student not found - " + id));
    }

    @Override
    public Recipe findByName(String name) {
        return recipeRepository.findByName(name);
    }


}