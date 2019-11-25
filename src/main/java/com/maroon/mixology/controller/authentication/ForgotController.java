package com.maroon.mixology.controller.authentication;

import java.util.Calendar;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.exchange.request.ForgotRequest;
import com.maroon.mixology.exchange.request.ResetPasswordRequest;
import com.maroon.mixology.exchange.response.ApiResponse;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ForgotController {

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

        @Value("${tipsy.mail.passwordreset.subject}")
        private String passwordResetSubject;

        @Value("${tipsy.mail.passwordreset.message}")
        private String passwordResetMessage;

        @Value("${spring.mail.username}")
        private String mailUserName;

        @Value("${tipsy.react.port}")
        private String reactPort;

        // POST forget template
        @PostMapping({"/forgot"})
        public ResponseEntity<?> processForgotPasswordForm(@Valid @RequestBody ForgotRequest userEmail, HttpServletRequest request) {
                if(!userService.existsByEmail(userEmail.getEmail())) {
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User not found."),
                        HttpStatus.BAD_REQUEST);
                }
                else {
                        // Lookup user in database by e-mail
                        User user = userService.findByEmail(userEmail.getEmail());
                        //
                        user.setResetTokenUUID(UUID.randomUUID().toString()); // Generate a reset token UUID
                        user.setResetTokenCreationTime(Calendar.getInstance().getTimeInMillis()); // Generate a creation time and store it as a long
                        // 
                        // Save token to database
                        userRepository.save(user); // Saving the reset token in the database

                        // Send a reset email
                        // Should this also include the port number(?)
                        // For now, yes because of localhost. We have to disable this when uploading to Cloud
                        // the port should be 80 so please change this during deployment when we have domain name
                        String appUrl = request.getScheme() + "://" + request.getServerName() + ":" + reactPort;
                        
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
        
        @GetMapping({"/verifyReset"})
        public ResponseEntity<?> verifyReset(@RequestParam(value = "token") String token) {
                try{
                        //Get the current time
                        Calendar expiredTime = Calendar.getInstance();
                        expiredTime.add(Calendar.HOUR, -24); //get time 24 hours ago
                        // Find the user associated with the reset token
                        User user = userService.findByResetTokenUUID(token);
                        if(user == null) {
                                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User with that reset token not found"),
                                HttpStatus.NOT_FOUND);
                        }
                        Calendar tokenTime = Calendar.getInstance(); //Initialize a Calender object
                        tokenTime.setTimeInMillis(user.getResetTokenCreationTime()); //set the Token time from user DB
                        if(tokenTime.before(expiredTime)) { //check if token is expired
                                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Reset token is expired, invalid token"),
                                HttpStatus.GONE); //Token is expired, invalid token.
                        }
                        return ResponseEntity.ok(new ApiResponse(true, "Reset password link is valid, proceed to reset your password"));
                } catch(Exception e){
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Reset token unable to be validated. Error: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
                }
        }

        @PostMapping({"/resetPassword"})
        public ResponseEntity<?> resetPasswordForm(@RequestBody ResetPasswordRequest resetPasswordRequest) {
                try{
                        // Find the user associated with the reset token
                        User user = userService.findByResetTokenUUID(resetPasswordRequest.getUUID());
                        if(user == null) {
                                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User not found, invalid token."),
                                        HttpStatus.NOT_FOUND);
                        }
                        // Set new password
                        user.setPassword(passwordEncoder.encode(resetPasswordRequest.getPassword()));
                        // Set the reset token to null so it cannot be used again
                        user.setResetTokenUUID("");
                        user.setResetTokenCreationTime(null);
                        // Save user
                        userRepository.save(user);
                        // Notify the user that the reset is complete
                        return ResponseEntity.ok(new ApiResponse(true, "You have successfully reset your password.  You may now login."));
                } catch(Exception e){
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Password failed to be reset. Error: " + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
                }
        }
}
