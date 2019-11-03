package com.maroon.mixology.repository;
 
import com.maroon.mixology.entity.Role;
import com.maroon.mixology.entity.type.RoleType;

import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {

    Role findByName(RoleType name);
}