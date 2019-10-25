package com.maroon.mixology.repository;

import com.maroon.mixology.entity.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);

    User findByNickname(String nickname);
    
    User findByConfirmationToken(String confirmationToken);

    User findByResetToken(String resetToken);

    Boolean existsByEmail(String email);

    Boolean existsByNickname(String username);

}