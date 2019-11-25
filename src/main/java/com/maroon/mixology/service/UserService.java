package com.maroon.mixology.service;

import java.util.List;

import com.maroon.mixology.entity.User;

public interface UserService{
    
    User findByEmail(String email);

    User findByNickname(String nickname);

    List<User> findByNicknameLikeIgnoreCase(String name);

    User findByConfirmationTokenUUID(String confirmationTokenUUID);

    User findByResetTokenUUID(String resetToken);

    Boolean existsByEmail(String email);

    Boolean existsByNickname(String nickname);
}