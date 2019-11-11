package com.maroon.mixology.service;

import java.util.NoSuchElementException;

import com.maroon.mixology.entity.Recipe;

public interface RecipeService{

    Recipe findById(String id) throws NoSuchElementException;
    
    Recipe findByName(String name);

}