package com.maroon.mixology;

import com.maroon.mixology.entity.Role;
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
    //         Role adminRole = roleRepository.findByName("USER");
    //         if (adminRole == null) {
    //             Role newUserRole = new Role();
    //             newUserRole.setRole("USER");
    //             roleRepository.save(newUserRole);
    //         }
    //     };
    // }

}
