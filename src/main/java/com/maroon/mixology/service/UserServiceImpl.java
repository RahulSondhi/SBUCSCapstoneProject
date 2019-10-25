package com.maroon.mixology.service;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User findByNickname(String nickname) {
        return userRepository.findByNickname(nickname);
    }

    @Override
    public User findByConfirmationToken(String confirmationToken) {
		return userRepository.findByConfirmationToken(confirmationToken);
    }

    @Override
    public User findByResetToken(String resetToken) {
        return userRepository.findByResetToken(resetToken);
    }

    @Override
    public Boolean existsByEmail(String email){
        if(userRepository.findByEmail(email) == null){
            return false;
        }
        else{
            return true;
        }
    }
    
    @Override
    public Boolean existsByNickname(String nickname){
        if(userRepository.findByNickname(nickname) == null){
            return false;
        }
        else{
            return true;
        }
    }

}