package com.maroon.mixology.controller.tipsy;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.entity.Step;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.StepResponse;
import com.maroon.mixology.exchange.response.UnitResponse;
import com.maroon.mixology.security.CurrentUser;
import com.maroon.mixology.service.RecipeService;
import com.maroon.mixology.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tipsy/recipe/{recipeID}/")
public class StepController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private RecipeService recipeService;

    @GetMapping("step")
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
                //we have the step from the DB, return a StepResponse
                //Unit response needs to be made from Unit
                StepResponse stepResponse = new StepResponse(
                    step.getEquipmentToDo(),
                    step.getEquipmentDoing(),
                    step.getEquipmentProduct(),
                    step.getAction(),
                    step.getValue(),
                    new UnitResponse(
                    step.getUnit().getName(), 
                    step.getUnit().getUsMeasurement(), 
                    step.getUnit().getMetricMeasurement()) //Unit Response 
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