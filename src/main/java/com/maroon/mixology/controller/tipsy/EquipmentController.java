package com.maroon.mixology.controller.tipsy;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.maroon.mixology.entity.Equipment;
import com.maroon.mixology.entity.EquipmentType;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.EquipmentResponse;
import com.maroon.mixology.exchange.response.EquipmentTypeResponse;
import com.maroon.mixology.exchange.response.UserIdentityAvailability;
import com.maroon.mixology.exchange.response.brief.BriefEquipmentResponse;
import com.maroon.mixology.service.EquipmentService;
import com.maroon.mixology.service.EquipmentTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/tipsy/equipment")
public class EquipmentController {
    @Autowired
    private EquipmentService equipmentService;

    @Autowired
    private EquipmentTypeService equipmentTypeService;


    private static final Logger logger = LoggerFactory.getLogger(EquipmentController.class);

    @GetMapping("/{equipmentName}")
    public ResponseEntity<?> getEquipment(@PathVariable(value = "equipmentName") String equipmentName) {
        try{
            // We have the equipment Name, we can query this specifc one in the db
            Equipment equipment = equipmentService.findByName(equipmentName);
            // Build our equipment response
            EquipmentResponse equipmentResponse = new EquipmentResponse(
                equipment.getName(), 
                equipment.getImage(),
                new EquipmentTypeResponse(
                    equipment.getEquipmentType().getName(),
                    equipment.getEquipmentType().getActionsToDo(),
                    equipment.getEquipmentType().getActionsDoing()
                    )
                );
            return ResponseEntity.ok(equipmentResponse);
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Equipment was unable to be loaded. Error: " + e.toString()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getEquipments")
    public ResponseEntity<?> getEquipment() {
        try{
            List<Equipment> equipments = equipmentService.findAll();
            Set<BriefEquipmentResponse> briefEquipmentResponses = new HashSet<BriefEquipmentResponse>();
            for (Equipment e : equipments){
                briefEquipmentResponses.add(new BriefEquipmentResponse(
                    e.getName(), 
                    e.getImage(), 
                    e.getEquipmentType().getName())
                    );
            }
            return ResponseEntity.ok(briefEquipmentResponses);
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Equipments were unable to be loaded. Error: " + e.toString()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getEquipmentTypes")
    public ResponseEntity<?> getEquipmentTypes() {
        try{
            List<EquipmentType> equipmentTypes = equipmentTypeService.findAll();
            Set<EquipmentTypeResponse> equipmentTypeResponses = new HashSet<EquipmentTypeResponse>();
            for (EquipmentType eT : equipmentTypes){
                equipmentTypeResponses.add(new EquipmentTypeResponse(
                    eT.getName(), 
                    eT.getActionsToDo(), 
                    eT.getActionsDoing())
                    );
            }
            return ResponseEntity.ok(equipmentTypeResponses);
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Equipments were unable to be loaded. Error: " + e.toString()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/checkEquipmentNameIsPresent")
    public UserIdentityAvailability checkEquipmentIsPresent(@RequestParam(value = "equipmentName") String equipmentName) {
        Boolean isAvailable = equipmentService.existsByName(equipmentName);
        return new UserIdentityAvailability(isAvailable);
    }

}