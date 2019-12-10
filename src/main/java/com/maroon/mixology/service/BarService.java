package com.maroon.mixology.service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.entity.User;
import com.maroon.mixology.repository.BarRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BarService {
    @Autowired
    private BarRepository barRepository;

    /* Our custom method to overrule Optional*/
    public Bar findById(String id) {
        if(barRepository.findById(id).isEmpty()){
            return null;
        }
        return barRepository.findById(id).get();
    }

    public Bar findByName(String name) {
        return barRepository.findByName(name);
    }

    public List<Bar> findByNameLikeIgnoreCase(String name) {
        return barRepository.findByNameLikeIgnoreCase(name);
    }

    public List<Bar> findByOwnerOrManagersOrWorkers(User user) {
        return barRepository.findByOwnerOrManagersInOrWorkersIn(user, new HashSet<User>(Arrays.asList(user)), new HashSet<User>(Arrays.asList(user)));
    }

    public List<Bar> findByRecipe(Recipe recipe){
        return barRepository.findByRecipesAvailableIn(new HashSet<Recipe>(Arrays.asList(recipe)));
    }

}