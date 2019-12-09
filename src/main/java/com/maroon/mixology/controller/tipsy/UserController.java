package com.maroon.mixology.controller.tipsy;

import java.util.Calendar;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

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
import com.maroon.mixology.service.BarService;
import com.maroon.mixology.service.EmailService;
import com.maroon.mixology.service.RecipeService;
import com.maroon.mixology.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/tipsy/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private BarService barService;
    
    @Autowired
    private RecipeService recipeService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

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
                        HttpStatus.NOT_FOUND);
            }
            // Build all
            Set<BriefBarResponse> userBars = new HashSet<BriefBarResponse>();
            for (String barID : user.getBars()) {
                Bar bar = barService.findById(barID);
                userBars.add(new BriefBarResponse(
                        bar.getId(), 
                        bar.getName(), 
                        bar.getImage(), 
                        bar.getOwner().getNickname()
                    ));
            }
            Set<BriefRecipeResponse> userRecipesWritten = new HashSet<BriefRecipeResponse>();
            for (String recipeWrittenID : user.getRecipesWritten()){
                Recipe recipeWritten = recipeService.findById(recipeWrittenID);
                    userRecipesWritten.add(new BriefRecipeResponse(
                            recipeWritten.getId(), 
                            recipeWritten.getName(), 
                            recipeWritten.getImage(), 
                            recipeWritten.getAuthor().getNickname(),
                            recipeWritten.isPublished()
                        ));
            }
            Set<BriefRecipeResponse> userRecipesCompleted = new HashSet<BriefRecipeResponse>();
            for (String recipeCompletedID : user.getRecipesCompleted()){
                Recipe recipeCompleted = recipeService.findById(recipeCompletedID);
                userRecipesCompleted.add(new BriefRecipeResponse(
                    recipeCompleted.getId(), 
                    recipeCompleted.getName(), 
                    recipeCompleted.getImage(), 
                    recipeCompleted.getAuthor().getNickname(),
                    recipeCompleted.isPublished()
                    ));
            }
            Set<BriefRecipeResponse> userRecipesIncompleted = new HashSet<BriefRecipeResponse>();
            for (String recipeIncompletedID : user.getRecipesIncompleted()){
                Recipe recipeIncompleted = recipeService.findById(recipeIncompletedID);
                userRecipesIncompleted.add(new BriefRecipeResponse(
                    recipeIncompleted.getId(), 
                    recipeIncompleted.getName(), 
                    recipeIncompleted.getImage(), 
                    recipeIncompleted.getAuthor().getNickname(),
                    recipeIncompleted.isPublished()
                    ));
            }
            UserResponse userResponse = new UserResponse(
                user.getNickname(),
                user.getProfilePic(), 
                user.getFirstName() + " " + user.getLastName(),
                userBars,
                userRecipesWritten,
                userRecipesCompleted,
                userRecipesIncompleted
                );
    
            return ResponseEntity.ok(userResponse);
        } catch (Exception e) {
            logger.error("UserProfile was unable to be loaded. Error: ", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "UserProfile was unable to be loaded. Error: " + e.toString()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{nickname}/changeSettings")
    public ResponseEntity<?> changeSettings(@CurrentUser UserDetails currentUser, @PathVariable(value = "nickname") String nickname, @Valid @RequestBody SettingsRequest settingsRequest, HttpServletRequest request) {
        try{
            //Only for self and admin
            //we get the current user by getting their email address
            User requester = userService.findByEmail(currentUser.getUsername());
            boolean isAdmin = false;
            //check if self or admin
            for (Role r : requester.getRoles()){
                if(r.getName().equals("ADMIN")){
                    isAdmin = true;
                }
            }
            if(nickname.equals(requester.getNickname()) || isAdmin){
                User user = userService.findByNickname(nickname);
                user.setFirstName(settingsRequest.getFirstName());
                user.setLastName(settingsRequest.getLastName());
                //Setting Email should be different...
                String emailUpdate = "";
                if(!user.getEmail().equals(settingsRequest.getEmail())){
                    //We need to verify the new email address while also notifying the old email address
                    if(userService.existsByEmail(settingsRequest.getEmail())){
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User with that email address already exists"),
                            HttpStatus.BAD_REQUEST); 
                    }
                    // Create a token
                    user.setConfirmationTokenUUID(UUID.randomUUID().toString()); // Generate a confirmation token UUID
                    user.setConfirmationTokenCreationTime(Calendar.getInstance().getTimeInMillis()); // Generate a creation time and store it as a long
                    // Send a notification email             
                    SimpleMailMessage confirmationEmail = new SimpleMailMessage();
                    confirmationEmail.setFrom(mailUserName);
                    confirmationEmail.setTo(user.getEmail()); //old email
                    confirmationEmail.setSubject(notificationSubject);
                    confirmationEmail.setText(notificationMessage + settingsRequest.getEmail()); //notification message
                    emailService.sendEmail(confirmationEmail);
                    //Now send a verification email
                    String appUrl = request.getScheme() + "://" + request.getServerName() + ":" + reactPort;
                    SimpleMailMessage verificationEmail = new SimpleMailMessage();
                    verificationEmail.setFrom(mailUserName);
                    verificationEmail.setTo(settingsRequest.getEmail()); //new email
                    verificationEmail.setSubject(verificationSubject);
                    verificationEmail.setText(verificationMessage
                    + appUrl + "/newEmail?token=" + user.getConfirmationTokenUUID() + "&email=" + settingsRequest.getEmail());
                    emailService.sendEmail(verificationEmail);
                    emailUpdate = " A message has been sent to complete updating your email. Please verify this new email from the message sent to your inbox.";
                }
                //the rest we can safely update
                user.setProfilePic(settingsRequest.getImg());
                user.setMeasurement(MeasurementType.valueOf(settingsRequest.getMeasurement()));
                userRepository.save(user);
                return ResponseEntity.ok(new ApiResponse(true, "User settings have been updated successfully!" + emailUpdate));
            }
            else{
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unauthorized request to change settings"), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            logger.error("User settings failed to update. Error:", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User settings failed to update. Error: " + e.toString()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }  
    }

    @GetMapping({"/verifyNewEmail"})
    public ResponseEntity<?> verifyNewEmail(@RequestParam(value = "token") String token, @RequestParam(value = "email") String email ){
            try {
                //Get the current time
                Calendar expiredTime = Calendar.getInstance();
                expiredTime.add(Calendar.HOUR, -24); //get time 24 hours ago
                // Find the user associated with the reset token
                User user = userService.findByConfirmationTokenUUID(token);
                if(user == null) {
                    logger.error("User with that confirmation token not found");
                    return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User with that confirmation token not found"),
                        HttpStatus.NOT_FOUND);
                }
                // if(user.isEnabled()) {
                //     return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User with that confirmation token was already enabled"),
                //         HttpStatus.BAD_REQUEST); //User is already enabled
                // }
                Calendar tokenTime = Calendar.getInstance(); //Initialize a Calender object
                tokenTime.setTimeInMillis(user.getConfirmationTokenCreationTime()); //set the Token time from user DB
                if(tokenTime.before(expiredTime)) { //check if token is expired
                        //need to add a use case to allow confirmation link to be sent again
                        //email should be resent
                        //or rather, send the confirmation link again here
                        logger.error("Confirmation token is expired, invalid token");
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Confirmation token is expired, invalid token"),
                            HttpStatus.GONE); //Token is expired, invalid token.
                }
                // Set user to new email
                user.setEmail(email);
                // Clear Token
                user.setConfirmationTokenUUID("");
                user.setConfirmationTokenCreationTime(null);  
                // Save user
                userRepository.save(user);
                // Notify the user that the confirmation is complete 
                return ResponseEntity.ok(new ApiResponse(true, "You new email has been set! You may now login."));
            } catch (Exception e){
                logger.error("Confirmation token unable to be validated.", e);
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Confirmation token unable to be validated. Error: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }


    @GetMapping("/{nickname}/getSettings")
    public ResponseEntity<?> getSettings(@CurrentUser UserDetails currentUser, @PathVariable(value = "nickname") String nickname) {
        //we get the current user by getting their email address
        try{
            User requester = userService.findByEmail(currentUser.getUsername());
            boolean isAdmin = false;
            //check if self or admin
            for (Role r : requester.getRoles()){
                if(r.getName().equals("ADMIN")){
                    isAdmin = true;
                }
            }
            if(nickname.equals(requester.getNickname()) || isAdmin){
                User user = userService.findByNickname(nickname);
                UserSettingsResponse userSettings = new UserSettingsResponse(
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getProfilePic(),
                    user.getMeasurement());
                return ResponseEntity.ok(userSettings);
            } else {
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unauthorized request to get settings"), HttpStatus.UNAUTHORIZED);
            }
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