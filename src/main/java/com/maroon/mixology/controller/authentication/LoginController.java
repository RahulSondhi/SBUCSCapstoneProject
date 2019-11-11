package com.maroon.mixology.controller.authentication;

import javax.validation.Valid;

import com.maroon.mixology.exchange.request.LoginRequest;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.JwtAuthenticationResponse;
import com.maroon.mixology.repository.RoleRepository;
import com.maroon.mixology.repository.UserRepository;
import com.maroon.mixology.security.JwtTokenProvider;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
        JwtTokenProvider tokenProvider;

        @Value("${tipsy.mail.passwordreset.subject}")
        private String passwordResetSubject;

        @Value("${tipsy.mail.passwordreset.message}")
        private String passwordResetMessage;

        @Value("${spring.mail.username}")
        private String mailUserName;

        @Value("${tipsy.react.port}")
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
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);

                String jwt = tokenProvider.generateToken(authentication);
                return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
        }
}
