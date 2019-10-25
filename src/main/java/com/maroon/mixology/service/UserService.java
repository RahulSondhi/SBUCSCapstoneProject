package com.maroon.mixology.service;

import com.maroon.mixology.entity.User;

public interface UserService{
    
    User findByEmail(String email);

    User findByNickname(String nickname);

    User findByConfirmationToken(String confirmationToken);

    User findByResetToken(String resetToken);

    Boolean existsByEmail(String email);

    Boolean existsByNickname(String nickname);
}