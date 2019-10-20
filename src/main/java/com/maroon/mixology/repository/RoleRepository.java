package com.maroon.mixology.repository;
 
import com.maroon.mixology.entity.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
<<<<<<< Updated upstream
import org.springframework.stereotype.Repository;

@Repository
=======

>>>>>>> Stashed changes
public interface RoleRepository extends MongoRepository<Role, String> {

    Role findByRole(String role);
}