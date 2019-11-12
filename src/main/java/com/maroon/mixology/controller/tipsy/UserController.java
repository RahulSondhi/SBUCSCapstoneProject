package com.maroon.mixology.controller.tipsy;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.entity.User;
import com.maroon.mixology.exchange.request.SettingsRequest;
import com.maroon.mixology.exchange.response.ApiResponse;

import com.maroon.mixology.exchange.response.UserIdentityAvailability;
import com.maroon.mixology.exchange.response.UserResponse;
import com.maroon.mixology.exchange.response.UserSummary;
import com.maroon.mixology.exchange.response.brief.BriefBarResponse;
import com.maroon.mixology.exchange.response.brief.BriefRecipeResponse;
import com.maroon.mixology.repository.UserRepository;
import com.maroon.mixology.security.CurrentUser;
import com.maroon.mixology.service.BarServiceImpl;
import com.maroon.mixology.service.RecipeServiceImpl;
import com.maroon.mixology.service.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tipsy/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceImpl userService;
    
    @Autowired
    private BarServiceImpl barService;
    
    @Autowired
    private RecipeServiceImpl recipeService;

    @GetMapping("/currentUser")
    // @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserDetails currentUser) {
        // We have their email address
        User user = userService.findByEmail(currentUser.getUsername());
        UserSummary userSummary = new UserSummary(user.getId(), user.getEmail(), user.getNickname());
        return userSummary;
    }

    @GetMapping("/checkNicknameAvailability")
    public UserIdentityAvailability checkNicknameAvailability(@RequestParam(value = "nickname") String nickname) {
        Boolean isAvailable = !userService.existsByNickname(nickname);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userService.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<?> getProfile(@PathVariable(value = "nickname") String nickname) {
        try{
            User user = userService.findByNickname(nickname);
            if (user == null) {
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Nickname '" + nickname + "' was not found!"),
                        HttpStatus.BAD_REQUEST);
            }
            // Build all
            Set<BriefBarResponse> userBars = new HashSet<BriefBarResponse>();
            for (String barID : user.getBars()) {
                Bar bar = barService.findById(barID);
                userBars.add(new BriefBarResponse(bar.getId(), bar.getName(), bar.getImage(), bar.getOwner().getNickname()));
            }
            Set<BriefRecipeResponse> userRecipesWritten = new HashSet<BriefRecipeResponse>();
            for (String recipeWrittenID : user.getRecipesWritten()){
                Recipe recipeWritten = recipeService.findById(recipeWrittenID);
                userRecipesWritten.add(new BriefRecipeResponse(recipeWritten.getId(), recipeWritten.getName(), recipeWritten.getImage(), recipeWritten.getAuthor().getNickname()));
            }
            Set<BriefRecipeResponse> userRecipesCompleted = new HashSet<BriefRecipeResponse>();
            for (String recipeCompletedID : user.getRecipesCompleted()){
                Recipe recipeCompleted = recipeService.findById(recipeCompletedID);
                userRecipesCompleted.add(new BriefRecipeResponse(recipeCompleted.getId(), recipeCompleted.getName(), recipeCompleted.getImage(), recipeCompleted.getAuthor().getNickname()));
            }
            Set<BriefRecipeResponse> userRecipesIncompleted = new HashSet<BriefRecipeResponse>();
            for (String recipeIncompletedID : user.getRecipesIncompleted()){
                Recipe recipeIncompleted = recipeService.findById(recipeIncompletedID);
                userRecipesIncompleted.add(new BriefRecipeResponse(recipeIncompleted.getId(), recipeIncompleted.getName(), recipeIncompleted.getImage(), recipeIncompleted.getAuthor().getNickname()));
            }
            UserResponse userProfile = new UserResponse(
                user.getNickname(),
                user.getProfilePic(), 
                user.getFirstName() + " " + user.getLastName(),
                userBars,
                userRecipesWritten,
                userRecipesCompleted,
                userRecipesIncompleted
                );
    
            return ResponseEntity.ok(userProfile);
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "UserProfile was unable to be loaded. Error: " + e.toString()),
                        HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/settings")
    public ResponseEntity<?> changeProfile(@CurrentUser UserDetails currentUser, @Valid @RequestBody SettingsRequest settingsRequest) {
        //we get the current user by getting their email address
        User user = userService.findByEmail(currentUser.getUsername());
        //If empty, leave default
        if(settingsRequest.getFirstName() != "")
            user.setFirstName(settingsRequest.getFirstName());
        userRepository.save(user);
        return null;
    }
}