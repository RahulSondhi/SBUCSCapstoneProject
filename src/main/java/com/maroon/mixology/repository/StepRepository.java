package com.maroon.mixology.repository;

import java.util.Optional;

import com.maroon.mixology.entity.Step;

import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface StepRepository extends MongoRepository<Step, String> {

    Optional<Step> findById(String id);

}