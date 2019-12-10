package com.maroon.mixology;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.entity.Equipment;
import com.maroon.mixology.entity.EquipmentType;
import com.maroon.mixology.entity.type.ActionType;
import com.maroon.mixology.entity.type.EquipmentTypeEnum;
import com.maroon.mixology.entity.Role;
import com.maroon.mixology.entity.Unit;
import com.maroon.mixology.entity.User;
import com.maroon.mixology.entity.type.MeasurementType;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.repository.BarRepository;
import com.maroon.mixology.repository.EquipmentRepository;
import com.maroon.mixology.repository.EquipmentTypeRepository;
import com.maroon.mixology.repository.RoleRepository;
import com.maroon.mixology.repository.UnitRepository;
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
    CommandLineRunner init(UserRepository userRepository, BarRepository barRepository, RoleRepository roleRepository, EquipmentRepository equipmentRepository, EquipmentTypeRepository equipmentTypeRepository, UnitRepository unitRepository) {
        return args -> {
            // Unit Table
            // Unit u = new Unit();
            // u.setName("Gallon");
            // u.setUsMeasurement(128);
            // u.setMetricMeasurement(3785.41);
            // unitRepository.save(u);
            // Equipment Type Table
            // EquipmentType eT = new EquipmentType();
            // eT.setName(EquipmentTypeEnum.COOLING);
            // Set<ActionType> doTo = new HashSet<ActionType>();
            // Set<ActionType> doing = new HashSet<ActionType>();
            // doTo.add(ActionType.PRESS);
            // doTo.add(ActionType.CRUSH);
            // doTo.add(ActionType.CUT);
            // doTo.add(ActionType.ADD);
            // doTo.add(ActionType.PEEL);
            // doTo.add(ActionType.POUR);
            // doTo.add(ActionType.MEASURE);
            // 
            // doing.add(ActionType.COOL);
            // doing.add(ActionType.IGNITE);
            // doing.add(ActionType.FREEZE);
            // eT.setActionsDoTo(doTo);
            // eT.setActionsDoing(doing);
            // equipmentTypeRepository.save(eT);
            // Equipment Table
            EquipmentType t = equipmentTypeRepository.findByName("PEELER");
            Equipment e = new Equipment(
                "Grater",
                "",
                t
            ); 
            equipmentRepository.save(e);
            // // Role adminRole = roleRepository.findByName("ADMIN");
            // // if (adminRole == null) {
            // //     Role newUserRole = new Role();
            // //     newUserRole.setName("ADMIN");
            // //     roleRepository.save(newUserRole);
            // // }
        };
    }

}
