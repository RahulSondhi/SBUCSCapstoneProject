package com.maroon.mixology.controller.tipsy;

import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.entity.Role;
import com.maroon.mixology.entity.User;
import com.maroon.mixology.entity.type.MeasurementType;
import com.maroon.mixology.exchange.request.ChangePasswordRequest;
import com.maroon.mixology.exchange.request.SettingsRequest;
import com.maroon.mixology.exchange.response.ApiResponse;

import com.maroon.mixology.exchange.response.UserIdentityAvailability;
import com.maroon.mixology.exchange.response.UserResponse;
import com.maroon.mixology.exchange.response.UserSettingsResponse;
import com.maroon.mixology.exchange.response.UserSummary;
import com.maroon.mixology.exchange.response.brief.BriefBarResponse;
import com.maroon.mixology.exchange.response.brief.BriefRecipeResponse;
import com.maroon.mixology.repository.UserRepository;
import com.maroon.mixology.security.CurrentUser;
import com.maroon.mixology.service.BarServiceImpl;
import com.maroon.mixology.service.EmailService;
import com.maroon.mixology.service.RecipeServiceImpl;
import com.maroon.mixology.service.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private EmailService emailService;
    
    @Autowired
    private BarServiceImpl barService;
    
    @Autowired
    private RecipeServiceImpl recipeService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Value("${tipsy.mail.newemail.subject}")
    private String notificationSubject;

    @Value("${tipsy.mail.newemailnotify.message}")
    private String notificationMessage;

    @Value("${tipsy.mail.newemail.subject}")
    private String verificationSubject;

    @Value("${tipsy.mail.newemail.message}")
    private String verificationMessage;

    @Value("${spring.mail.username}")
    private String mailUserName;

    @Value("${tipsy.react.port}")
    private String reactPort;
    
    @GetMapping("/currentUser")
    // @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserDetails currentUser) {
        // We have their email address
        User user = userService.findByEmail(currentUser.getUsername());
        //build roles
        Set<String> roles = new HashSet<String>();
        for (Role role : user.getRoles()){
            roles.add(role.getName());
        }
        UserSummary userSummary = new UserSummary(user.getId(), user.getEmail(), user.getNickname(), roles);
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

    @PostMapping("/changeSettings")
    public ResponseEntity<?> changeSettings(@CurrentUser UserDetails currentUser, @Valid @RequestBody SettingsRequest settingsRequest, HttpServletRequest request) {
        try{
            //we get the current user by getting their email address
            // System.out.println(settingsRequest.getMeasurement());
            User user = userService.findByEmail(currentUser.getUsername());
            user.setFirstName(settingsRequest.getFirstName());
            user.setLastName(settingsRequest.getLastName());
            //Setting Email should be different...
            if(!user.getEmail().equals(settingsRequest.getEmail())){
                //We need to confirm the new email address while also notifying the old email address
                // Send a notification email
                // Should this also include the port number(?)
                // For now, yes because of localhost. We have to disable this when uploading to Cloud
                // the port should be 80 so please change this during deployment when we have domain name
                String appUrl = request.getScheme() + "://" + request.getServerName() + ":" + reactPort;
                
                SimpleMailMessage confirmationEmail = new SimpleMailMessage();
                confirmationEmail.setFrom(mailUserName);
                confirmationEmail.setTo(user.getEmail());
                confirmationEmail.setSubject(notificationSubject);
                confirmationEmail.setText(notificationMessage);
                emailService.sendEmail(confirmationEmail);

                //Now send a verification email
            }
            user.setProfilePic(settingsRequest.getProfilePic());
            user.setMeasurement(MeasurementType.valueOf(settingsRequest.getMeasurement()));
            userRepository.save(user);
            return ResponseEntity.ok(new ApiResponse(true, "User settings have been updated successfully!"));
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User settings failed to update. Error: " + e.toString()),
                        HttpStatus.BAD_REQUEST);
        }  
    }

    @GetMapping("/getSettings")
    public ResponseEntity<?> getSettings(@CurrentUser UserDetails currentUser) {
        //we get the current user by getting their email address
        try{
            User user = userService.findByEmail(currentUser.getUsername());
            UserSettingsResponse userSettings = new UserSettingsResponse(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getProfilePic(),
                user.getMeasurement());
            return ResponseEntity.ok(userSettings);
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User settings failed to load. Error: " + e.toString()),
            HttpStatus.BAD_REQUEST);
        }
        
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@CurrentUser UserDetails currentUser, @Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        try{
            //we get the current user by getting their email address
            User user = userService.findByEmail(currentUser.getUsername());
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getPassword()));
            userRepository.save(user);
            return ResponseEntity.ok(new ApiResponse(true, "Password has been updated successfully!"));
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Password failed to update. Error: " + e.toString()),
                        HttpStatus.BAD_REQUEST);
        }  
    }
}