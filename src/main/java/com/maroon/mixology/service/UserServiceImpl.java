package com.maroon.mixology.service;

import java.util.List;

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
    public User findByConfirmationTokenUUID(String confirmationTokenUUID) {
        return userRepository.findByConfirmationTokenUUID(confirmationTokenUUID);
    }

    @Override
    public User findByResetTokenUUID(String resetTokenUUID) {
        return userRepository.findByResetTokenUUID(resetTokenUUID);
    }

    @Override
    public Boolean existsByEmail(String email) {
        if (userRepository.findByEmail(email) == null) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public Boolean existsByNickname(String nickname) {
        if (userRepository.findByNickname(nickname) == null) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public List<User> findByNicknameLikeIgnoreCase(String name) {
        // TODO Auto-generated method stub
        return userRepository.findByNicknameLikeIgnoreCase(name);
    }

}