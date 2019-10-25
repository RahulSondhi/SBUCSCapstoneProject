package com.maroon.mixology.controller;

import java.net.URI;
import java.util.Arrays;
import java.util.HashSet;

import javax.validation.Valid;

import com.maroon.mixology.entity.Role;
import com.maroon.mixology.entity.Token;
import com.maroon.mixology.entity.User;
import com.maroon.mixology.exception.AppException;
import com.maroon.mixology.exchange.request.LoginRequest;
import com.maroon.mixology.exchange.request.RegisterRequest;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.JwtAuthenticationResponse;
import com.maroon.mixology.repository.RoleRepository;
import com.maroon.mixology.repository.UserRepository;
import com.maroon.mixology.security.JwtTokenProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */
@RestController
public class AuthenticationController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        if(!userRepository.findByEmail(loginRequest.getEmail()).getEnabled()){
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
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        if(userRepository.existsByEmail(registerRequest.getEmail())) {
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
        if(userRepository.existsByNickname(registerRequest.getNickname())){
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Nickname already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
        // Creating user's account
        User user = new User(registerRequest.getFirstName(), registerRequest.getLastName(), registerRequest.getEmail(), registerRequest.getNickname(), registerRequest.getPassword());
        user.setEnabled(false); // Disable the user until they click on the confirmation link in email
        user.setConfirmationToken(new Token()); // Generate a confirmation token
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Set the password (HASHED)
        Role userRole = roleRepository.findByRole("USER");
        if(userRole == null){
                throw new AppException("User Role not set.");
        }
        user.setRoles(new HashSet<>(Arrays.asList(userRole)));

        User result = userRepository.save(user); // Saving the user in the database

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/tipsy/{nickname}")
                .buildAndExpand(result.getEmail()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}
