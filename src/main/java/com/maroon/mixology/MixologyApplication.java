package com.maroon.mixology;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.entity.Equipment;
import com.maroon.mixology.entity.type.ActionType;
import com.maroon.mixology.entity.type.EquipmentType;

import com.maroon.mixology.entity.Role;
import com.maroon.mixology.entity.User;
import com.maroon.mixology.entity.type.MeasurementType;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.repository.BarRepository;
import com.maroon.mixology.repository.EquipmentRepository;
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
    CommandLineRunner init(UserRepository userRepository, BarRepository barRepository, RoleRepository roleRepository, EquipmentRepository equipmentRepository) {
        return args -> {
            // Equipment e = new Equipment();
            // e.setName("Simple Syrup");
            // e.setType(EquipmentType.SYRUP);
            //Actions
            // Set<ActionType> doTo = new HashSet<ActionType>();
            // Set<ActionType> doing = new HashSet<ActionType>();
            // Add image
            // e.setImage("");
            // Add actions
            // DoTo
            // doTo.add(ActionType.POUR);
            // doTo.add(ActionType.ADD);
            // doTo.add(ActionType.MIX);
            // doTo.add(ActionType.SHAKE);
            // doTo.add(ActionType.MEASURE);
            // Doing
            // doing.add(ActionType.POUR);
            // doing.add(ActionType.SHAKE);
            // doing.add(ActionType.PRESS);
            // doing.add(ActionType.CRUSH);
            // doing.add(ActionType.CUT);
            // doing.add(ActionType.MEASURE);
            // doing.add(ActionType.BLEND);
            // doing.add(ActionType.PEEL);
            // doing.add(ActionType.HEAT);
            // doing.add(ActionType.COOL);
            //
            // e.setActionsDoTo(doTo);
            // e.setActionsDoing(doing);
            // equipmentRepository.save(e);
            // // Role adminRole = roleRepository.findByName("ADMIN");
            // // if (adminRole == null) {
            // //     Role newUserRole = new Role();
            // //     newUserRole.setName("ADMIN");
            // //     roleRepository.save(newUserRole);
            // // }
            // User bryan = userRepository.findByNickname("bryan");
            // bryan.setMeasurement(MeasurementType.US);
            // userRepository.save(bryan);
            // User rahul = userRepository.findByNickname("rahul");
            // User manny = userRepository.findByNickname("manny");
            // Set<User> workers = new HashSet<User>();
            // Set<User> managers = new HashSet<User>();
            // ArrayList<Recipe> barRecipes = new ArrayList<Recipe>();
            // managers.add(rahul);
            // workers.add(manny);
            // Bar bar = new Bar("My Second Bar", bryan, "", managers, workers, barRecipes);
            // barRepository.save(bar);
            // bryan.getBars().add(bar.getId());
            // rahul.getBars().add(bar.getId());
            // manny.getBars().add(bar.getId());
            // userRepository.save(bryan);
            // userRepository.save(rahul);
            // userRepository.save(manny);
        };
    }

}
