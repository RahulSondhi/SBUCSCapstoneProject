package com.maroon.mixology.repository;

import com.maroon.mixology.entity.ConfirmationToken;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

public interface ConfirmationTokenRepository extends MongoRepository<ConfirmationToken, String> {
    ConfirmationToken findByConfirmationToken(String confirmationToken);
}