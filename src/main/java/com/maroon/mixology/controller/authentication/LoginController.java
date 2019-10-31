package com.maroon.mixology.controller.authentication;

import java.util.Calendar;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.exchange.request.ForgotRequest;
import com.maroon.mixology.exchange.request.LoginRequest;
import com.maroon.mixology.exchange.request.ResetPasswordRequest;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.JwtAuthenticationResponse;
import com.maroon.mixology.exchange.response.TokenValidity;
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
public class LoginController {

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

        @Value("${mixology.mail.passwordreset.subject}")
        private String passwordResetSubject;

        @Value("${mixology.mail.passwordreset.message}")
        private String passwordResetMessage;

        @Value("${spring.mail.username}")
        private String mailUserName;

        @Value("${mixology.react.port}")
        private String reactPort;

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
                ); //Bug is right here please fix it thanks 

                SecurityContextHolder.getContext().setAuthentication(authentication);

                String jwt = tokenProvider.generateToken(authentication);
                return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
        }


        // POST forget template
        @PostMapping({"/forgot"})
        public ResponseEntity<?> processForgotPasswordForm(@Valid @RequestBody ForgotRequest userEmail, HttpServletRequest request) {
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
        
        @GetMapping({"/validateReset"})
        public TokenValidity validateReset(@RequestParam(value = "token") String token) {
                //Get the current time
                Calendar expiredTime = Calendar.getInstance();
                expiredTime.add(Calendar.HOUR, -24); //get time 24 hours ago
                // Find the user associated with the reset token
                User user = userService.findByResetTokenUUID(token);
                if(user == null) {
                        return new TokenValidity(false, "User not found"); //User not found
                }
                Calendar tokenTime = Calendar.getInstance(); //Initialize a Calender object
                tokenTime.setTimeInMillis(user.getConfirmationTokenCreationTime()); //set the Token time from user DB
                if(tokenTime.before(expiredTime)) { //check if token is expired
                        return new TokenValidity(false, "Token is expired, invalid token."); //Token expired
                }
                return new TokenValidity(true, "Reset password link is valid, proceed to reset your password"); //Reset password link is valid, proceed to reset your password
        }

        @PostMapping({"/resetPassword"})
        public ResponseEntity<?> resetPasswordForm(@RequestBody ResetPasswordRequest resetPasswordRequest) {
                // Find the user associated with the reset token
                User user = userService.findByResetTokenUUID(resetPasswordRequest.getUUID());
                if(user == null) {
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User not found, invalid token."),
                                HttpStatus.BAD_REQUEST);
                }
                // Set new password
                user.setPassword(passwordEncoder.encode(resetPasswordRequest.getPassword()));
                // Set the reset token to null so it cannot be used again
                user.setResetTokenUUID(null);
                user.setResetTokenCreationTime(null);
                // Save user
                userRepository.save(user);
                // Notify the user that the confirmation is complete
                return ResponseEntity.ok(new ApiResponse(true, "You have successfully reset your password.  You may now login."));
        }
}
