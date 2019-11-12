package com.maroon.mixology.controller.tipsy;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.Helper;
import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.exchange.request.BarRequest;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.BarResponse;
import com.maroon.mixology.exchange.response.brief.BriefRecipeResponse;
import com.maroon.mixology.exchange.response.brief.BriefUserResponse;
import com.maroon.mixology.repository.BarRepository;
import com.maroon.mixology.repository.RecipeRepository;
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
            for (String recipeID : barRequest.getRecipesAvaliable()){
                barRecipes.add(recipeService.findById(recipeID));
            }
            Bar bar = new Bar(
                barRequest.getName(),
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
            //Added the bar to all affliated Users
            return ResponseEntity.ok(new ApiResponse(true, "Bar creation was succesfully submitted and saved in the database!"));
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Bar was unable to be saved. Error: " + e.toString()),
                        HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/{barID}")
    public ResponseEntity<?> getBarProfile(@PathVariable(value = "barID") String barID) {
        try{
            //BarID is base64 encoded
            barID = Helper.decodeBase64ToHex(barID);
            //we have to query the bar from Mongo
            Bar bar = barService.findById(barID);
            //We have the bar, now lets build a Bar Response
            Set<BriefUserResponse> barManagers = new HashSet<BriefUserResponse>();
            for (User manager : bar.getManagers()){
                barManagers.add(new BriefUserResponse(manager.getNickname(), manager.getFirstName() + " " + manager.getLastName(), manager.getProfilePic()));
            }
            Set<BriefUserResponse> barWorkers = new HashSet<BriefUserResponse>();
            for (User worker : bar.getWorkers()){
                barWorkers.add(new BriefUserResponse(worker.getNickname(), worker.getFirstName() + " " + worker.getLastName(), worker.getProfilePic()));
            }
            Set<BriefRecipeResponse> barRecipesAvaliable = new HashSet<BriefRecipeResponse>();
            for (Recipe recipeAvaliable : bar.getRecipesAvaliable()){
                barRecipesAvaliable.add(new BriefRecipeResponse(recipeAvaliable.getId(), recipeAvaliable.getName(), recipeAvaliable.getImage(), recipeAvaliable.getAuthor().getNickname()));
            }
            //lets build our response
            BarResponse barProfile = new BarResponse(
                bar.getName(),
                bar.getOwner().getNickname(),
                bar.getImage(),
                barManagers,
                barWorkers,
                barRecipesAvaliable
            );
            return ResponseEntity.ok(barProfile);
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Bar was unable to be loaded. Error: " + e.toString()),
                        HttpStatus.BAD_REQUEST);
        }
    }

}