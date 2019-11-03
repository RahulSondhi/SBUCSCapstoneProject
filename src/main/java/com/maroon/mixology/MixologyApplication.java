package com.maroon.mixology;

import com.maroon.mixology.entity.Role;
import com.maroon.mixology.entity.type.RoleType;
import com.maroon.mixology.repository.RoleRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MixologyApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(MixologyApplication.class, args);
	}
	
	// @Bean
    // CommandLineRunner init(RoleRepository roleRepository) {
    //     return args -> {
    //         Role userRole = roleRepository.findByRole(RoleType.USER);
    //         if (userRole == null) {
    //             Role newUserRole = new Role();
    //             newUserRole.setRole(RoleType.USER);
    //             roleRepository.save(newUserRole);
    //         }
    //     };
    // }

}
