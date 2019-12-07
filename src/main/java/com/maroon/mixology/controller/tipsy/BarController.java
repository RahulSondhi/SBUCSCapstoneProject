package com.maroon.mixology.controller.tipsy;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.entity.Role;
import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.exchange.request.BarRequest;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.BarResponse;
import com.maroon.mixology.exchange.response.brief.BriefRecipeResponse;
import com.maroon.mixology.exchange.response.brief.BriefUserResponse;
import com.maroon.mixology.repository.BarRepository;
import com.maroon.mixology.repository.UserRepository;
import com.maroon.mixology.security.CurrentUser;
import com.maroon.mixology.service.BarServiceImpl;
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
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/tipsy/bar")
public class BarController {
    @Autowired
    private UserRepository userRepository;
            
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private RecipeServiceImpl recipeService;
    
    @Autowired
    private BarRepository barRepository;

    @Autowired
    private BarServiceImpl barService;

    private static final Logger logger = LoggerFactory.getLogger(BarController.class);

    @PostMapping("/createBar")
    public ResponseEntity<?> createNewBar(@CurrentUser UserDetails currentUser, @Valid @RequestBody BarRequest barRequest) {
        try{
            //we get the current user by getting their email address
            User user = userService.findByEmail(currentUser.getUsername());
            //We need to build the list of managers, workers, and recipes from their IDS
            Set<User> barManagers = new HashSet<User>();
            for (String managerNickname : barRequest.getManagers()){
                barManagers.add(userService.findByNickname(managerNickname));
            }
            Set<User> barWorkers = new HashSet<User>();
            for (String workerNickname : barRequest.getWorkers()){
                barWorkers.add(userService.findByNickname(workerNickname));
            }
            Set<Recipe> barRecipes = new HashSet<Recipe>();
            for (String recipeID : barRequest.getRecipesAvailable()){
                barRecipes.add(recipeService.findById(recipeID));
            }
            Bar bar = new Bar(
                barRequest.getName(),
                barRequest.getDescription(),
                user,
                barRequest.getImg(),
                barManagers,
                barWorkers,
                barRecipes
            );
            barRepository.save(bar); //we save the bar in the database
            //we have to add this bar to the user's list of bars
            Set<User> combinedUsers = new HashSet<User>();
            combinedUsers.add(user);
            combinedUsers.addAll(barManagers);
            combinedUsers.addAll(barWorkers);
            for (User u : combinedUsers){
                u.getBars().add(bar.getId()); 
                userRepository.save(u);
            }
            // userRepository.saveAll(combinedUsers);
            //Added the bar to all affliated Users
            return ResponseEntity.ok(new ApiResponse(true, "Bar creation was succesfully submitted and saved in the database!"));
        } catch (Exception e) {
            logger.error("Bar was unable to be created.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Bar was unable to be created. Error: " + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/{barID}")
    public ResponseEntity<?> getBarProfile(@PathVariable(value = "barID") String barID) {
        try{
            //we have to query the bar from Mongo
            Bar bar = barService.findById(barID);
            //We have the bar, now lets build a Bar Response
            Set<BriefUserResponse> barManagers = new HashSet<BriefUserResponse>();
            for (User manager : bar.getManagers()){
                barManagers.add(new BriefUserResponse(
                    manager.getNickname(), 
                    manager.getFirstName() + " " + manager.getLastName(), 
                    manager.getProfilePic()
                    ));
            }
            Set<BriefUserResponse> barWorkers = new HashSet<BriefUserResponse>();
            for (User worker : bar.getWorkers()){
                barWorkers.add(new BriefUserResponse(worker.getNickname(), worker.getFirstName() + " " + worker.getLastName(), worker.getProfilePic()));
            }
            Set<BriefRecipeResponse> barRecipesAvailable = new HashSet<BriefRecipeResponse>();
            for (Recipe recipeAvailable : bar.getRecipesAvailable()){
                barRecipesAvailable.add(new BriefRecipeResponse(recipeAvailable.getId(), recipeAvailable.getName(), recipeAvailable.getImage(), recipeAvailable.getAuthor().getNickname()));
            }
            //lets build our response
            BriefUserResponse barOwner = new BriefUserResponse(bar.getOwner().getNickname(), bar.getOwner().getFirstName() + " " + bar.getOwner().getLastName(), bar.getOwner().getProfilePic()); 
            BarResponse barProfile = new BarResponse(
                bar.getName(),
                bar.getDescription(),
                bar.getImage(),
                barOwner,
                barManagers,
                barWorkers,
                barRecipesAvailable
            );
            return ResponseEntity.ok(barProfile);
        } catch (Exception e) {
            logger.error("Bar was unable to be loaded.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Bar was unable to be loaded. Error: " + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{barID}/changeSettings")
    public ResponseEntity<?> changeBarSettings(@PathVariable(value = "barID") String barID, @CurrentUser UserDetails currentUser, @Valid @RequestBody BarRequest barRequest) {
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
            Bar bar = barService.findById(barID);
            //We must validate that the user is an owner, manager, or worker
            Set<String> managerIdList = new HashSet<String>();
            for (User u : bar.getManagers()){
                managerIdList.add(u.getId());
            }
            if(bar.getOwner().getId().equals(requester.getId()) || isAdmin){
                //owner or admin{FULL ACCESS}
                //We can easily update the Name, Description, and Image
                bar.setName(barRequest.getName());
                bar.setDescription(barRequest.getDescription());
                bar.setImage(barRequest.getImg());
                //We can add or remove managers
                //Diassociate everyone in managers
                for (User u : bar.getManagers()){
                    u.getBars().remove(barID);
                    userRepository.save(u);
                }
                //Reassociate everyone
                Set<User> barManagers = new HashSet<User>();
                for (String managerNickname : barRequest.getManagers()){
                    User u = userService.findByNickname(managerNickname);
                    barManagers.add(u);
                    u.getBars().add(barID);
                    userRepository.save(u);
                }
                bar.setManagers(barManagers);
                //We can add or remove workers
                //Diassociate everyone in workers
                for (User u : bar.getWorkers()){
                    u.getBars().remove(barID);
                    userRepository.save(u);
                }
                //Reassociate everyone
                Set<User> barWorkers = new HashSet<User>();
                for (String workerNickname : barRequest.getWorkers()){
                    User u = userService.findByNickname(workerNickname);
                    barWorkers.add(u);
                    u.getBars().add(barID);
                    userRepository.save(u);
                }
                bar.setWorkers(barWorkers);
                //we can add or remove recipes available
                Set<Recipe> barRecipes = new HashSet<Recipe>();
                for (String recipeID : barRequest.getRecipesAvailable()){
                    barRecipes.add(recipeService.findById(recipeID));
                }
                bar.setRecipesAvailable(barRecipes);
                //We save this bar
                barRepository.save(bar);
                return ResponseEntity.ok(new ApiResponse(true, "Bar was succesfully Updated!"));
            }
            else if(managerIdList.contains(requester.getId())){
                //Reassociate everyone
                Set<User> barWorkers = new HashSet<User>();
                for (String workerNickname : barRequest.getWorkers()){
                    User u = userService.findByNickname(workerNickname);
                    barWorkers.add(u);
                    u.getBars().add(barID);
                    userRepository.save(u);
                }
                bar.setWorkers(barWorkers);
                //we can add or remove recipes available
                Set<Recipe> barRecipes = new HashSet<Recipe>();
                for (String recipeID : barRequest.getRecipesAvailable()){
                    barRecipes.add(recipeService.findById(recipeID));
                }
                bar.setRecipesAvailable(barRecipes);
                //We save this bar
                barRepository.save(bar);
                return ResponseEntity.ok(new ApiResponse(true, "Bar was succesfully Updated!"));
            }
            else{
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unauthorized request to change settings"), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            logger.error("Bar was unable to be updated.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Bar was unable to be updated. Error: " + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }  
    }

    @PostMapping("/{barID}/delete")
    public ResponseEntity<?> deleteBar(@PathVariable(value = "barID") String barID, @CurrentUser UserDetails currentUser) {
        try{
            // we get the current user by getting their email address
            User requester = userService.findByEmail(currentUser.getUsername());
            boolean isAdmin = false;
            for (Role r : requester.getRoles()){
                if(r.getName().equals("ADMIN")){
                    isAdmin = true;
                }
            }
            Bar bar = barService.findById(barID);
            if(bar.getOwner().getId().equals(requester.getId()) || isAdmin){
                //we have to disassociate everyone
                Set<User> combinedUsers = new HashSet<User>();
                combinedUsers.add(bar.getOwner());
                combinedUsers.addAll(bar.getManagers());
                combinedUsers.addAll(bar.getWorkers());
                for (User u : combinedUsers){
                    u.getBars().remove(bar.getId()); 
                    userRepository.save(u);
                }
                //We delete the bar
                barRepository.delete(bar);
                return ResponseEntity.ok(new ApiResponse(true, "Bar was succesfully deleted!"));
            }
            else{
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unauthorized request to delete bar"), HttpStatus.UNAUTHORIZED); 
            }
        } catch (Exception e) {
            logger.error("Bar was unable to be deleted.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Bar was unable to be deleted. Error: " + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }  
    }

   
}