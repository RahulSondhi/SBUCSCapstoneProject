package com.maroon.mixology.service;

import java.util.List;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findByNickname(String nickname) {
        return userRepository.findByNickname(nickname);
    }

    public User findByConfirmationTokenUUID(String confirmationTokenUUID) {
        return userRepository.findByConfirmationTokenUUID(confirmationTokenUUID);
    }

    public User findByResetTokenUUID(String resetTokenUUID) {
        return userRepository.findByResetTokenUUID(resetTokenUUID);
    }

    public Boolean existsByEmail(String email) {
        if (userRepository.findByEmail(email) == null) {
            return false;
        } else {
            return true;
        }
    }

    public Boolean existsByNickname(String nickname) {
        if (userRepository.findByNickname(nickname) == null) {
            return false;
        } else {
            return true;
        }
    }

    public List<User> findByNicknameLikeIgnoreCase(String name) {
        return userRepository.findByNicknameLikeIgnoreCase(name);
    }

}