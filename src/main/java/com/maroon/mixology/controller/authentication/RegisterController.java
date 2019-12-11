package com.maroon.mixology.controller.authentication;

import java.util.Arrays;
import java.util.Calendar;
import java.util.HashSet;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.maroon.mixology.entity.Role;
import com.maroon.mixology.entity.User;
import com.maroon.mixology.entity.type.MeasurementType;
import com.maroon.mixology.exception.AppException;
import com.maroon.mixology.exchange.request.RegisterRequest;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.repository.RoleRepository;
import com.maroon.mixology.repository.UserRepository;
import com.maroon.mixology.security.JwtTokenProvider;
import com.maroon.mixology.service.EmailService;
import com.maroon.mixology.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {

        @Autowired
        AuthenticationManager authenticationManager;

        @Autowired
        UserRepository userRepository;

        @Autowired
        RoleRepository roleRepository;

        @Autowired
        private BCryptPasswordEncoder passwordEncoder;

        @Autowired
        JwtTokenProvider tokenProvider;
        
        @Autowired
        private EmailService emailService;

        @Autowired
        private UserService userService;

        @Value("${tipsy.mail.confirmation.subject}")
        private String confirmationSubject;

        @Value("${tipsy.mail.confirmation.message}")
        private String confirmationMessage;

        @Value("${spring.mail.username}")
        private String mailUserName;

        @Value("${tipsy.react.URL}")
        private String appUrl;

        @PostMapping("/register")
        public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try{
                if(userService.existsByEmail(registerRequest.getEmail())) {
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "This Email Address is already in use!"),
                        HttpStatus.BAD_REQUEST);
                }
                if(userService.existsByNickname(registerRequest.getNickname())){
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "This Nickname is already in use!"),
                        HttpStatus.BAD_REQUEST);
                }
                else{
                        // Creating user's account
                        User user = new User(
                                registerRequest.getFirstName(), 
                                registerRequest.getLastName(), 
                                registerRequest.getEmail(), 
                                registerRequest.getNickname(), 
                                registerRequest.getPassword()
                                );
                        user.setEnabled(false); // Disable the user until they click on the confirmation link in email
                        //
                        user.setConfirmationTokenUUID(UUID.randomUUID().toString()); // Generate a confirmation token UUID
                        user.setConfirmationTokenCreationTime(Calendar.getInstance().getTimeInMillis()); // Generate a creation time and store it as a long
                        //
                        user.setPassword(passwordEncoder.encode(user.getPassword())); // Set the password (HASHED)
                        Role userRole = roleRepository.findByName("USER");
                        // Role adminRole = roleRepository.findByName("ADMIN");
                        if(userRole == null){
                                throw new AppException("User Role not set.");
                        }
                        user.setRoles(new HashSet<>(Arrays.asList(userRole))); // Set the Roles
                        user.setMeasurement(MeasurementType.US); // Set the Measurement
                        userRepository.save(user); // Saving the user in the database
                        // Send a confirmation email                      
                        SimpleMailMessage confirmationEmail = new SimpleMailMessage();
                        confirmationEmail.setFrom(mailUserName);
                        confirmationEmail.setTo(user.getEmail());
                        confirmationEmail.setSubject(confirmationSubject);
                        confirmationEmail.setText(confirmationMessage
                        + appUrl + "?flow=confirm&token=" + user.getConfirmationTokenUUID());
                        emailService.sendEmail(confirmationEmail);
                        // Notify the user that an email has been sent
                        return ResponseEntity.ok(new ApiResponse(true, "Thank you! You have successfully registered. Please check your email to complete your registration!"));
                        }
                } catch(Exception e){
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unable to register. Error: " + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);  
                }
        }

        @GetMapping({"/verifyConfirm"})
        public ResponseEntity<?> verifyConfirm(@RequestParam(value = "token") String token,  HttpServletRequest request){
                try{
                        //Get the current time
                        Calendar expiredTime = Calendar.getInstance();
                        expiredTime.add(Calendar.HOUR, -24); //get time 24 hours ago
                        // Find the user associated with the reset token
                        User user = userService.findByConfirmationTokenUUID(token);
                        if(user == null) {
                                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User with that confirmation token was not found."),
                                HttpStatus.NOT_FOUND);
                        }
                        if(user.isEnabled()) {
                                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User with that confirmation token was already enabled"),
                                HttpStatus.BAD_REQUEST); //User is already enabled
                        }
                        Calendar tokenTime = Calendar.getInstance(); //Initialize a Calender object
                        tokenTime.setTimeInMillis(user.getConfirmationTokenCreationTime()); //set the Token time from user DB
                        if(tokenTime.before(expiredTime)) { //check if token is expired
                                //allow confirmation link to be sent again
                                user.setConfirmationTokenUUID(UUID.randomUUID().toString()); // Generate a confirmation token UUID
                                user.setConfirmationTokenCreationTime(Calendar.getInstance().getTimeInMillis()); // Generate a creation time and store it as a long
                                SimpleMailMessage confirmationEmail = new SimpleMailMessage();
                                confirmationEmail.setFrom(mailUserName);
                                confirmationEmail.setTo(user.getEmail());
                                confirmationEmail.setSubject(confirmationSubject);
                                confirmationEmail.setText(confirmationMessage
                                + appUrl + "?flow=confirm&token=" + user.getConfirmationTokenUUID());
                                emailService.sendEmail(confirmationEmail);
                                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "This confirmation token is expired, invalid token. A new confirmation token has been generated and sent to your email."),
                            HttpStatus.GONE); //Token is expired, invalid token.
                        }
                        // Set user to enabled
                        user.setEnabled(true);
                        // Clear Token
                        user.setConfirmationTokenUUID("");
                        user.setConfirmationTokenCreationTime(null);
                        // Save user
                        userRepository.save(user);
                        // Notify the user that the confirmation is complete
                        return ResponseEntity.ok(new ApiResponse(true, "Your account has been confirmed. You may now login!"));
                } 
                catch (Exception e){
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Confirmation token unable to be validated. Error: " + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
                }
        }
        
}
