package com.maroon.mixology.controller.tipsy;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.maroon.mixology.entity.Equipment;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.EquipmentResponse;
import com.maroon.mixology.exchange.response.EquipmentTypeResponse;
import com.maroon.mixology.exchange.response.brief.BriefEquipmentResponse;
import com.maroon.mixology.service.EquipmentServiceImpl;

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
    private EquipmentServiceImpl equipmentService;

    private static final Logger logger = LoggerFactory.getLogger(BarController.class);

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
                    equipment.getEquipmentType().getActionsDoTo(),
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

    @GetMapping("/getBrief")
    public ResponseEntity<?> getEquipmentBrief(@RequestParam(value = "name") String name) {
        try{
            //we have to query the bar from Mongo
            Equipment equipment = equipmentService.findByName(name);
            if(equipment == null){
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Equipment '" + name + "' was not found!"),
                    HttpStatus.NOT_FOUND);
            }
            //now we return the brief responses
            return ResponseEntity.ok(new BriefEquipmentResponse(
                equipment.getName(), 
                equipment.getImage(), 
                equipment.getEquipmentType().getName()
            ));
        } catch (Exception e) {
            logger.error("Equipment was unable to be loaded.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Equipment was unable to be loaded. Error: " + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}