package com.maroon.mixology.service;

import com.maroon.mixology.entity.User;

public interface UserService{
    
    void saveUser(User user);

    User findByEmail(String email);

    User findByConfirmationToken(String confirmationToken);

    User findByResetToken(String resetToken);

}