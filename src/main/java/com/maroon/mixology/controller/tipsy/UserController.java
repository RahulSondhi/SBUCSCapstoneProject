package com.maroon.mixology.controller.tipsy;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.ProfileResponse;
import com.maroon.mixology.exchange.response.UserIdentityAvailability;
import com.maroon.mixology.exchange.response.ProfileResponse;
import com.maroon.mixology.exchange.response.UserSummary;
import com.maroon.mixology.repository.UserRepository;
import com.maroon.mixology.security.CurrentUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tipsy/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    // @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserDetails currentUser) {
        //We have their email address
        User user = userRepository.findByEmail(currentUser.getUsername());
        UserSummary userSummary = new UserSummary(user.getId(), user.getEmail(), user.getNickname());
        return userSummary;
    }

    @GetMapping("/checkNicknameAvailability")
    public UserIdentityAvailability checkNicknameAvailability(@RequestParam(value = "nickname") String nickname) {
        Boolean isAvailable = !userRepository.existsByNickname(nickname);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<?> getProfile(@PathVariable(value = "nickname") String nickname) {
        User user = userRepository.findByNickname(nickname);
        if(user == null){
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Nickname [" + nickname + "] was not found!"), HttpStatus.BAD_REQUEST);
        }
        
        ProfileResponse userProfile = new ProfileResponse(
            user.getNickname(),
            user.getProfilePic(), 
            user.getFirstName() + " " + user.getLastName(),
            null,
            null 
            );

        return ResponseEntity.ok(userProfile);
    }


}