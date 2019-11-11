package com.maroon.mixology.controller.tipsy;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.exchange.request.BarRequest;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.repository.BarRepository;
import com.maroon.mixology.repository.RecipeRepository;
import com.maroon.mixology.repository.UserRepository;
import com.maroon.mixology.security.CurrentUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tipsy/recipe")
public class RecipeController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BarRepository barRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @PostMapping("/createRecipe")
    public ResponseEntity<?> createNewBar(@CurrentUser UserDetails currentUser, @Valid @RequestBody BarRequest barRequest) {
        try{
            //we get the current user by getting their email address
            User user = userRepository.findByEmail(currentUser.getUsername());
            //We need to build the list of managers, workers, and recipes from their IDS
            Set<User> barManagers = new HashSet<User>();
            for (String managerNickname : barRequest.getManagers()){
                barManagers.add(userRepository.findByNickname(managerNickname));
            }
            Set<User> barWorkers = new HashSet<User>();
            for (String workerNickname : barRequest.getWorkers()){
                barWorkers.add(userRepository.findByNickname(workerNickname));
            }
            ArrayList<Recipe> barRecipes = new ArrayList<Recipe>();
            for (String recipeID : barRequest.getRecipesAvaliable()){
                barRecipes.add(recipeRepository.findById(recipeID).orElse(null));
            }
            Bar bar = new Bar(
                barRequest.getName(),
                user,
                barRequest.getImage(),
                barManagers,
                barWorkers,
                barRecipes
            );
            barRepository.save(bar); //we save the bar in the database
            user.getBars().add(bar); //we have to add this bar to the user's list of bars
            userRepository.save(user);
            return ResponseEntity.ok(new ApiResponse(true, "Bar creation was succesfully submitted and saved in the database!"));
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Bar was unable to be saved. Error: " + e.toString()),
                        HttpStatus.BAD_REQUEST);
        }

    }


}