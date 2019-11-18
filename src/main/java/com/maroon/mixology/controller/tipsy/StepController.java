package com.maroon.mixology.controller.tipsy;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.entity.Step;
import com.maroon.mixology.exchange.request.BarRequest;
import com.maroon.mixology.exchange.request.RecipeRequest;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.EquipmentResponse;
import com.maroon.mixology.exchange.response.StepResponse;
import com.maroon.mixology.exchange.response.UnitResponse;
import com.maroon.mixology.repository.BarRepository;
import com.maroon.mixology.repository.RecipeRepository;
import com.maroon.mixology.repository.UserRepository;
import com.maroon.mixology.security.CurrentUser;
import com.maroon.mixology.service.RecipeServiceImpl;
import com.maroon.mixology.service.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tipsy/recipe/{recipeID}/")
public class StepController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BarRepository barRepository;

    @Autowired
    private RecipeRepository recipeRepository;
    
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private RecipeServiceImpl recipeService;

    @GetMapping("/step")
    public ResponseEntity<?> getStep(@CurrentUser UserDetails currentUser, @PathVariable(value = "recipeID") String recipeID, @RequestParam(value = "index") String index) {
        try{
            int i =  Integer.parseInt(index) - 1; // 0 -> n-1
            // we get the current user by getting their email address
            User user = userService.findByEmail(currentUser.getUsername());
            // we have the recipeID
            Recipe recipe = recipeService.findById(recipeID);
            // user needs to hgave in their recipeInc
            if(user.getRecipesIncompleted().contains(recipeID)) {
                //We have the recipe, we just need to get the step from index
                Step step = recipe.getSteps().get(i);
                //we have the step, return a StepResponse
                //We have to account for Custom Equipment
                EquipmentResponse equipmentTodo;
                EquipmentResponse equipmentDoing;
                if(step.isCustomEquipmentTodo()){
                    equipmentTodo = new EquipmentResponse(
                        step.getCustomObjToDo().getName(),
                        step.getCustomObjToDo().getImage(), 
                        step.getCustomObjToDo().getType(), 
                        step.getCustomObjToDo().getActionsDoTo(), 
                        step.getCustomObjToDo().getActionsDoing());
                }
                else{
                    equipmentTodo = new EquipmentResponse(
                        step.getObjToDo().getName(),
                        step.getObjToDo().getImage(), 
                        step.getObjToDo().getType(), 
                        step.getObjToDo().getActionsDoTo(), 
                        step.getObjToDo().getActionsDoing());
                }
                if(step.isCustomEquipmentDoing()){
                    equipmentDoing = new EquipmentResponse(
                        step.getCustomObjDoing().getName(),
                        step.getCustomObjDoing().getImage(), 
                        step.getCustomObjDoing().getType(), 
                        step.getCustomObjDoing().getActionsDoTo(), 
                        step.getCustomObjDoing().getActionsDoing());
                }
                else{
                    equipmentDoing = new EquipmentResponse(
                        step.getObjDoing().getName(),
                        step.getObjDoing().getImage(), 
                        step.getObjDoing().getType(), 
                        step.getObjDoing().getActionsDoTo(), 
                        step.getObjDoing().getActionsDoing());
                }
                UnitResponse unitResponse = new UnitResponse(
                    step.getUnit().getName(), 
                    step.getUnit().getMlMeasurement(), 
                    step.getUnit().getFlozMeasurement()
                );

                StepResponse stepResponse = new StepResponse(
                    equipmentTodo,
                    equipmentDoing,
                    step.getAction(),
                    step.getValue(),
                    unitResponse //Unit Response 
                    );
                    return ResponseEntity.ok(stepResponse);
            }
            else{
                // Throw an error, they need to add the recipe in order to request a step from it
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Step was unable to be loaded. User must have Recipe available to them in order to access step"),
                        HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Step was unable to be loaded. Error: " + e.toString()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}