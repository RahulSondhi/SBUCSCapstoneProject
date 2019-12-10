package com.maroon.mixology.service;

import java.util.List;

import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.entity.User;
import com.maroon.mixology.repository.RecipeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    /* Our custom method to overrule Optional*/
    public Recipe findById(String id) {
        if(!recipeRepository.findById(id).isPresent()){
            return null;
        }
        return recipeRepository.findById(id).get();
    }

    public Recipe findByName(String name) {
        return recipeRepository.findByName(name);
    }

	public List<Recipe> findByNameLikeIgnoreCase(String name) {
		return recipeRepository.findByNameLikeIgnoreCaseAndPublished(name, true);
	}

    public List<Recipe> findByAuthor(User author){
        return recipeRepository.findByAuthor(author);
    }

}