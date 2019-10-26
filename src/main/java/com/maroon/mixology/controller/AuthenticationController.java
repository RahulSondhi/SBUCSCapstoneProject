package com.maroon.mixology.controller;

import java.util.Arrays;
import java.util.Calendar;
import java.util.HashSet;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.maroon.mixology.entity.Role;
import com.maroon.mixology.entity.User;
import com.maroon.mixology.exception.AppException;
import com.maroon.mixology.exchange.request.ForgotRequest;
import com.maroon.mixology.exchange.request.LoginRequest;
import com.maroon.mixology.exchange.request.RegisterRequest;
import com.maroon.mixology.exchange.request.ResetRequest;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.JwtAuthenticationResponse;
import com.maroon.mixology.repository.RoleRepository;
import com.maroon.mixology.repository.UserRepository;
import com.maroon.mixology.security.JwtTokenProvider;
import com.maroon.mixology.service.EmailService;
import com.maroon.mixology.service.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

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
        private UserServiceImpl userService;

        @Value("${mixology.mail.confirmation.subject}")
        private String confirmationSubject;

        @Value("${mixology.mail.confirmation.message}")
        private String confirmationMessage;

        @Value("${mixology.mail.passwordreset.subject}")
        private String passwordResetSubject;

        @Value("${mixology.mail.passwordreset.message}")
        private String passwordResetMessage;

        @Value("${spring.mail.username}")
        private String mailUserName;

        @PostMapping("/login")
        public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
                if(!userRepository.existsByEmail(loginRequest.getEmail())){
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Email Address is not found!"),
                        HttpStatus.BAD_REQUEST);
                }
                if(!userRepository.findByEmail(loginRequest.getEmail()).isEnabled()){
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Email Address is not enabled!"),
                        HttpStatus.BAD_REQUEST);
                }
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getEmail(),
                                loginRequest.getPassword()
                        )
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);

                String jwt = tokenProvider.generateToken(authentication);
                return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
        }

        @PostMapping("/register")
        public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest, HttpServletRequest request) {
                if(userRepository.existsByEmail(registerRequest.getEmail())) {
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Email Address already in use!"),
                        HttpStatus.BAD_REQUEST);
                }
                if(userRepository.existsByNickname(registerRequest.getNickname())){
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Nickname already in use!"),
                        HttpStatus.BAD_REQUEST);
                }
                else{
                        // Creating user's account
                        User user = new User(registerRequest.getFirstName(), registerRequest.getLastName(), registerRequest.getEmail(), registerRequest.getNickname(), registerRequest.getPassword());
                        user.setEnabled(false); // Disable the user until they click on the confirmation link in email
                        //
                        user.setConfirmationTokenUUID(UUID.randomUUID().toString()); // Generate a confirmation token UUID
                        user.setConfirmationTokenCreationTime(Calendar.getInstance().getTimeInMillis()); // Generate a creation time and store it as a long
                        //
                        user.setPassword(passwordEncoder.encode(user.getPassword())); // Set the password (HASHED)
                        Role userRole = roleRepository.findByRole("USER");
                        if(userRole == null){
                                throw new AppException("User Role not set.");
                        }
                        user.setRoles(new HashSet<>(Arrays.asList(userRole)));
                        
                        userRepository.save(user); // Saving the user in the database

                        // Send a confirmation email
                        // Should this also include the port number(?)
                        // For now, yes because of localhost. We have to disable this when uploading to Cloud
                        String appUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
                        
                        SimpleMailMessage confirmationEmail = new SimpleMailMessage();
                        confirmationEmail.setFrom(mailUserName);
                        confirmationEmail.setTo(user.getEmail());
                        confirmationEmail.setSubject(confirmationSubject);
                        confirmationEmail.setText(confirmationMessage
                        + appUrl + "/confirm?token=" + user.getConfirmationTokenUUID());
                        emailService.sendEmail(confirmationEmail);
                        // Notify the user that an email has been sent
                        return ResponseEntity.ok(new ApiResponse(true, "User registeration submitted successfully. Please complete the registration process by confirming your account."));
                        }
                }

        @GetMapping({"/validateConfirm"})
        public ResponseEntity<?> validateConfirmation(@RequestParam Map<String, String> requestParams){
                //Get the current time
                Calendar expiredTime = Calendar.getInstance();
                expiredTime.add(Calendar.HOUR, -24); //get time 24 hours ago
                // Find the user associated with the reset token
                User user = userService.findByConfirmationTokenUUID(requestParams.get("token"));
                if(user == null) {
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User not found, invalid token."),
                                HttpStatus.BAD_REQUEST);
                        }
                if(user.isEnabled()) {
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User is already enabled."),
                                HttpStatus.BAD_REQUEST);
                        }
                Calendar tokenTime = Calendar.getInstance(); //Initialize a Calender object
                tokenTime.setTimeInMillis(user.getConfirmationTokenCreationTime()); //set the Token time from user DB
                if(tokenTime.before(expiredTime)) { //check if token is expired
                        //need to add a use case to allow confirmation link to be sent again
                        //or rather, send the confirmation link again here
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Token is expired, invalid token."),
                                HttpStatus.BAD_REQUEST);
                        }
                return ResponseEntity.ok(new ApiResponse(true, "Confirmation link is valid, proceed to confirm your account"));
        }

        @PostMapping({"/confirm"})
        public ResponseEntity<?> processConfirmationForm(@RequestParam Map<String, String> requestParams) {
                // Find the user associated with the confirmation token
                User user = userService.findByConfirmationTokenUUID(requestParams.get("token"));
                if(user == null) {
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User not found, invalid token."),
                                HttpStatus.BAD_REQUEST);
                }
                // Set user to enabled
                user.setEnabled(true);
                // Save user
                userRepository.save(user);
                // Notify the user that the confirmation is complete 
                return ResponseEntity.ok(new ApiResponse(true, "User registeration complete. You may now login."));
                }


        // POST forget template
        @PostMapping({"/forgot"})
        public ResponseEntity<?> processForgotPasswordForm(@RequestBody ForgotRequest userEmail, HttpServletRequest request) {
                if(!userRepository.existsByEmail(userEmail.getEmail())) {
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User not found."),
                        HttpStatus.BAD_REQUEST);
                }
                else {
                        // Lookup user in database by e-mail
                        User user = userService.findByEmail(userEmail.getEmail());
                        //
                        user.setResetTokenUUID(UUID.randomUUID().toString()); // Generate a reset token UUID
                        user.setConfirmationTokenCreationTime(Calendar.getInstance().getTimeInMillis()); // Generate a creation time and store it as a long
                        // 
                        // Save token to database
                        userRepository.save(user); // Saving the reset token in the database

                        // Send a reset email
                        // Should this also include the port number(?)
                        // For now, yes because of localhost. We have to disable this when uploading to Cloud
                        String appUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
                        
                        SimpleMailMessage resetEmail = new SimpleMailMessage();
                        resetEmail.setFrom(mailUserName);
                        resetEmail.setTo(user.getEmail());
                        resetEmail.setSubject(passwordResetSubject);
                        resetEmail.setText(passwordResetMessage
                        + appUrl + "/reset?token=" + user.getResetTokenUUID());
                        emailService.sendEmail(resetEmail);
                        // Notify the user that an email has been sent
                        return ResponseEntity.ok(new ApiResponse(true, "Password reset request submitted succesfully. Please check your email."));
                }
                
        }
        
        @GetMapping({"/validateReset"})
        public ResponseEntity<?> processResetForm(@RequestParam Map<String, String> requestParams) {
                //Get the current time
                Calendar expiredTime = Calendar.getInstance();
                expiredTime.add(Calendar.HOUR, -24); //get time 24 hours ago
                // Find the user associated with the reset token
                User user = userService.findByResetTokenUUID(requestParams.get("token"));
                if(user == null) {
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User not found, invalid token."),
                                HttpStatus.BAD_REQUEST);
                }
                Calendar tokenTime = Calendar.getInstance(); //Initialize a Calender object
                tokenTime.setTimeInMillis(user.getConfirmationTokenCreationTime()); //set the Token time from user DB
                if(tokenTime.before(expiredTime)) { //check if token is expired
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Token is expired, invalid token. Redirect to forgot password page."),
                                HttpStatus.BAD_REQUEST);
                }
                return ResponseEntity.ok(new ApiResponse(true, "Reset password link is valid, proceed to reset your password"));
        }

        @PostMapping({"/resetPassword"})
        public ResponseEntity<?> resetPasswordForm(@RequestBody ResetRequest resetRequest) {
                // Find the user associated with the reset token
                User user = userService.findByResetTokenUUID(resetRequest.getUUID());
                if(user == null) {
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User not found, invalid token."),
                                HttpStatus.BAD_REQUEST);
                }
                // Set new password
                user.setPassword(passwordEncoder.encode(resetRequest.getPassword()));
                // Set the reset token to null so it cannot be used again
                user.setResetTokenUUID(null);
                user.setResetTokenCreationTime(null);
                // Save user
                userRepository.save(user);
                // Notify the user that the confirmation is complete
                return ResponseEntity.ok(new ApiResponse(true, "You have successfully reset your password.  You may now login."));
        }
}
