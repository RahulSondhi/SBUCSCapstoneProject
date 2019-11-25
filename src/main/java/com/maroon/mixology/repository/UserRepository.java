package com.maroon.mixology.repository;

import java.util.List;

import com.maroon.mixology.entity.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    User findByEmail(String email);

    User findByNickname(String nickname);

    //Will this work?
    List<User> findByNicknameLikeIgnoreCase(String name);

    User findByConfirmationTokenUUID(String confirmationTokenUUID);

    User findByResetTokenUUID(String resetTokenUUID);

    Boolean existsByEmail(String email);

    Boolean existsByNickname(String username);

}