package com.maroon.mixology.controller.tipsy;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.entity.type.ActionType;
import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.entity.Equipment;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.entity.Step;
import com.maroon.mixology.exchange.request.BarRequest;
import com.maroon.mixology.exchange.request.EquipmentRequest;
import com.maroon.mixology.exchange.request.RecipeRequest;
import com.maroon.mixology.exchange.request.StepRequest;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.EquipmentResponse;
import com.maroon.mixology.exchange.response.EquipmentTypeResponse;
import com.maroon.mixology.exchange.response.RecipeResponse;
import com.maroon.mixology.exchange.response.StepResponse;
import com.maroon.mixology.exchange.response.UnitResponse;
import com.maroon.mixology.exchange.response.brief.BriefEquipmentResponse;
import com.maroon.mixology.exchange.response.brief.BriefUserResponse;
import com.maroon.mixology.repository.BarRepository;
import com.maroon.mixology.repository.RecipeRepository;
import com.maroon.mixology.repository.StepRepository;
import com.maroon.mixology.repository.UserRepository;
import com.maroon.mixology.security.CurrentUser;
import com.maroon.mixology.service.EquipmentTypeServiceImpl;
import com.maroon.mixology.service.RecipeService;
import com.maroon.mixology.service.RecipeServiceImpl;
import com.maroon.mixology.service.UnitServiceImpl;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tipsy/recipe")
public class RecipeController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private StepRepository stepRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private RecipeServiceImpl recipeService;

    @Autowired
    private EquipmentTypeServiceImpl equipmentTypeService;

    @Autowired
    private UnitServiceImpl unitService;
    
    @PostMapping("/createRecipe")
    public ResponseEntity<?> createNewRecipe(@CurrentUser UserDetails currentUser, @Valid @RequestBody RecipeRequest recipeRequest) {
        try{
            //we get the current user by getting their email address
            User user = userRepository.findByEmail(currentUser.getUsername());
            //We need to build the recipe
            Recipe recipe = new Recipe();
            recipe.setName(recipeRequest.getName());
            recipe.setImage(recipeRequest.getImg());
            recipe.setAuthor(user);
            recipe.setPublished(recipeRequest.getPublished());
            //Build the Steps from Step requests
            ArrayList<Step> steps = new ArrayList<Step>();
            for (StepRequest s : recipeRequest.getSteps()){
                steps.add(new Step(
                    s.getEquipmentToDo(),
                    s.getEquipmentDoing(),
                    s.getEquipmentProduct(),
                    ActionType.valueOf(s.getAction()),
                    s.getValue(),
                    unitService.findByName(s.getUnitName())
                ));
            }
            recipe.setSteps(steps);
            //Build the equipments from the Equipment Available
            Set<Equipment> equipmentsAvailable = new HashSet<Equipment>();
            for (EquipmentRequest e : recipeRequest.getEquipmentsAvailable()){
                equipmentsAvailable.add(new Equipment(
                    e.getName(),
                    e.getImg(),
                    equipmentTypeService.findByName(e.getEquipmentTypeName())
                ));
            }
            recipe.setEquipmentsAvailable(equipmentsAvailable);
            stepRepository.saveAll(steps); //Will this work?
            recipeRepository.save(recipe);
            return ResponseEntity.ok(new ApiResponse(true, "Recipe creation was succesfully submitted and saved in the database!"));
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Recipe was unable to be saved. Error: " + e.toString()),
                        HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{recipe}")
    public ResponseEntity<?> getRecipe(@CurrentUser UserDetails currentUser, @PathVariable(value = "recipeID") String recipeID) {
        try{
            User user = userService.findByEmail(currentUser.getUsername());
            //we have to query the recipe from Mongo
            Recipe recipe = recipeService.findById(recipeID);
            // We have the recipe, now lets build a recipe Response
            if(recipe.isPublished() || recipe.getAuthor().getId().equals(user.getId())){
                BriefUserResponse author = new BriefUserResponse(
                    recipe.getAuthor().getNickname(), 
                    recipe.getAuthor().getFirstName() + " " + recipe.getAuthor().getLastName(), 
                    recipe.getAuthor().getProfilePic()
                    );

                //Need to build Steps
                ArrayList<StepResponse> steps = new ArrayList<StepResponse>();
                for (Step s : recipe.getSteps()){
                    steps.add(new StepResponse(
                        s.getEquipmentToDo(),
                        s.getEquipmentDoing(),
                        s.getEquipmentProduct(),
                        s.getAction(),
                        s.getValue(),
                        new UnitResponse(
                            s.getUnit().getName(), 
                            s.getUnit().getUsMeasurement(), 
                            s.getUnit().getMetricMeasurement()) 
                        ));
                }
                //Need to build equipments response 
                Set<EquipmentResponse> equipmentsAvailable = new HashSet<EquipmentResponse>();
                for (Equipment e : recipe.getEquipmentsAvailable()){
                    equipmentsAvailable.add( new EquipmentResponse(
                        e.getName(), 
                        e.getImage(),
                        new EquipmentTypeResponse(
                            e.getEquipmentType().getName(),
                            e.getEquipmentType().getActionsDoTo(),
                            e.getEquipmentType().getActionsDoing()
                            )
                        ));
                }
                //lets build our response
                RecipeResponse recipeResponse = new RecipeResponse(
                    recipe.getName(),
                    recipe.getImage(),
                    author,
                    recipe.isPublished(),
                    steps, //StepResponses 
                    equipmentsAvailable //EquipmentResponse
                );
                return ResponseEntity.ok(recipeResponse);
            }
            else{
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "A published recipe with that ID was not found."),
                        HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Recipe was unable to be loaded. Error: " + e.toString()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}