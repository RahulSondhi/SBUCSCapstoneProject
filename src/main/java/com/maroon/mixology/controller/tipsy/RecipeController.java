package com.maroon.mixology.controller.tipsy;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.entity.type.ActionType;
import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.entity.Equipment;
import com.maroon.mixology.entity.EquipmentType;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.entity.Role;
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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
    
    private static final Logger logger = LoggerFactory.getLogger(BarController.class);

    @PostMapping("/createRecipe")
    public ResponseEntity<?> createNewRecipe(@CurrentUser UserDetails currentUser, @Valid @RequestBody RecipeRequest recipeRequest) {
        try{
            //we get the current user by getting their email address
            User user = userRepository.findByEmail(currentUser.getUsername());
            //We need to build the recipe
            Recipe recipe = new Recipe();
            recipe.setName(recipeRequest.getName());
            recipe.setDescription(recipeRequest.getDescription());
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
            Set<EquipmentResponse> equipmentsAvailable = new HashSet<EquipmentResponse>();
            for (EquipmentRequest e : recipeRequest.getEquipmentsAvailable()){
                EquipmentType eT = equipmentTypeService.findByName(e.getEquipmentTypeName());
                equipmentsAvailable.add(new EquipmentResponse(
                    e.getName(),
                    e.getImg(),
                    new EquipmentTypeResponse(
                            eT.getName(),
                            eT.getActionsDoTo(),
                            eT.getActionsDoing()
                    ))
                );
            }
            recipe.setEquipmentsAvailable(equipmentsAvailable);
            stepRepository.saveAll(steps); //Will this work?
            recipeRepository.save(recipe);
            user.getRecipesWritten().add(recipe.getId());//add this recipe to recipeWritten array for the user
            userRepository.save(user);
            return ResponseEntity.ok(new ApiResponse(true, "Recipe creation was succesfully submitted and saved in the database!"));
        } catch (Exception e) {
            logger.error("Recipe was unable to be created.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Recipe was unable to be created. Error: " + e.toString()),
                        HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{recipeID}")
    public ResponseEntity<?> getRecipe(@CurrentUser UserDetails currentUser, @PathVariable(value = "recipeID") String recipeID) {
        try{
            User user = userService.findByEmail(currentUser.getUsername());
            //we have to query the recipe from Mongo
            Recipe recipe = recipeService.findById(recipeID);
            // We have the recipe, now lets build a recipe Response
            // Unless you are the author, you cant view an unpublished recipe
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
                // Set<EquipmentResponse> equipmentsAvailable = new HashSet<EquipmentResponse>();
                // for (Equipment e : recipe.getEquipmentsAvailable()){
                //     equipmentsAvailable.add( new EquipmentResponse(
                //         e.getName(), 
                //         e.getImage(),
                //         new EquipmentTypeResponse(
                //             e.getEquipmentType().getName(),
                //             e.getEquipmentType().getActionsDoTo(),
                //             e.getEquipmentType().getActionsDoing()
                //             )
                //         ));
                // }
                //lets build our response
                RecipeResponse recipeResponse = new RecipeResponse(
                    recipe.getName(),
                    recipe.getDescription(),
                    recipe.getImage(),
                    author,
                    recipe.isPublished(),
                    steps, //StepResponses 
                    recipe.getEquipmentsAvailable() //EquipmentResponses
                );
                return ResponseEntity.ok(recipeResponse);
            }
            else{
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "A published recipe with that ID was not found."),
                        HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error("Recipe was unable to be loaded.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Recipe was unable to be loaded. Error: " + e.toString()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/{recipeID}/changeSettings")
    public ResponseEntity<?> changeRecipeSettings(@PathVariable(value = "recipeID") String recipeID, @CurrentUser UserDetails currentUser, @Valid @RequestBody RecipeRequest recipeRequest) {
        try{
            // we get the current user by getting their email address
            User requester = userService.findByEmail(currentUser.getUsername());
            boolean isAdmin = false;
            //Check if the user is an admin
            for (Role r : requester.getRoles()){
                if(r.getName().equals("ADMIN")){
                    isAdmin = true;
                }
            }
            //Find our recipe
            Recipe recipe = recipeService.findById(recipeID);
            //check if the requester is the author or an Admin
            if(recipe.getAuthor().getId().equals(requester.getId()) || isAdmin){
                recipe.setName(recipeRequest.getName());
                recipe.setDescription(recipeRequest.getDescription());
                recipe.setImage(recipeRequest.getImg());
                recipe.setPublished(recipeRequest.getPublished());
                //Build the Steps from Step requests
                // We should redo all the steps from the step request
                if(recipeRequest.getNewSteps()){
                    // we have to delete the steps saved
                    stepRepository.deleteAll(recipe.getSteps());
                    // now, lets add new steps
                    ArrayList<Step> newSteps = new ArrayList<Step>();
                    for (StepRequest s : recipeRequest.getSteps()){
                        newSteps.add(new Step(
                            s.getEquipmentToDo(),
                            s.getEquipmentDoing(),
                            s.getEquipmentProduct(),
                            ActionType.valueOf(s.getAction()),
                            s.getValue(),
                            unitService.findByName(s.getUnitName())
                        ));
                    }                    
                    recipe.setSteps(newSteps);
                    stepRepository.saveAll(newSteps); //Will this work?
                }
                // We should redo all the equipment from the equipment request
                if(recipeRequest.getNewEquipment()){
                    Set<EquipmentResponse> equipmentsAvailable = new HashSet<EquipmentResponse>();
                    for (EquipmentRequest e : recipeRequest.getEquipmentsAvailable()){
                        EquipmentType eT = equipmentTypeService.findByName(e.getEquipmentTypeName());
                        equipmentsAvailable.add(new EquipmentResponse(
                            e.getName(),
                            e.getImg(),
                            new EquipmentTypeResponse(
                                    eT.getName(),
                                    eT.getActionsDoTo(),
                                    eT.getActionsDoing()
                            ))
                        );
                    }
                    recipe.setEquipmentsAvailable(equipmentsAvailable);
                }
                //
                recipeRepository.save(recipe); //update recipe
                //
                return ResponseEntity.ok(new ApiResponse(true, "Recipe was succesfully updated!"));
            }
            else{
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unauthorized request to change settings"), 
                    HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            logger.error("Recipe was unable to be updated.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Bar was unable to be updated. Error: " + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }  
    }

    @PostMapping("/{recipeID}/delete")
    public ResponseEntity<?> deleteRecipe(@PathVariable(value = "recipeID") String recipeID, @CurrentUser UserDetails currentUser) {
        try{
            User requester = userService.findByEmail(currentUser.getUsername());
            boolean isAdmin = false;
            for (Role r : requester.getRoles()){
                if(r.getName().equals("ADMIN")){
                    isAdmin = true;
                }
            }
            Recipe recipe = recipeService.findById(recipeID);
            if(recipe.getAuthor().getId().equals(requester.getId()) || isAdmin){
                User author = userService.findByNickname(recipe.getAuthor().getNickname());
                author.getRecipesWritten().remove(recipe.getId());//delete this recipe from recipeWritten array for the user
                userRepository.save(author);
                stepRepository.deleteAll(recipe.getSteps());
                recipeRepository.delete(recipe);
                return ResponseEntity.ok(new ApiResponse(true, "Recipe was succesfully deleted!"));
            }
            else{
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unauthorized request to delete recipe"), HttpStatus.UNAUTHORIZED); 
            }
        } catch (Exception e) {
            logger.error("Recipe was unable to be deleted.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Recipe was unable to be deleted. Error: " + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }  
    }
}