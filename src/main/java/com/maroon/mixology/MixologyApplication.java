package com.maroon.mixology;

import java.util.HashSet;
import java.util.Set;

import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.entity.Role;
import com.maroon.mixology.entity.User;
import com.maroon.mixology.repository.BarRepository;
import com.maroon.mixology.repository.RoleRepository;
import com.maroon.mixology.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MixologyApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(MixologyApplication.class, args);
	}
	
	@Bean
    CommandLineRunner init(UserRepository userRepository, BarRepository barRepository, RoleRepository roleRepository) {
        return args -> {
            // Role adminRole = roleRepository.findByName("ADMIN");
            // if (adminRole == null) {
            //     Role newUserRole = new Role();
            //     newUserRole.setName("ADMIN");
            //     roleRepository.save(newUserRole);
            // }
            // User bryan = userRepository.findByNickname("bryan");
            // User rahul = userRepository.findByNickname("rahul");
            // User manny = userRepository.findByNickname("manny");
            // Set<User> workers = new HashSet<User>();
            // Set<User> managers = new HashSet<User>();
            // managers.add(rahul);
            // workers.add(manny);
            // Bar bar = new Bar("My First Bar", bryan, "", managers, workers, null);
            // bryan.getBars().add(bar);
            // rahul.getBars().add(bar);
            // manny.getBars().add(bar);
            // barRepository.save(bar);
            // userRepository.save(bryan);
            // userRepository.save(rahul);
            // userRepository.save(manny);

        };
    }

}
