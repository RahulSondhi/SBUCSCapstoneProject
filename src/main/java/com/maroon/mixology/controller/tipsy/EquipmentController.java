package com.maroon.mixology.controller.tipsy;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


import com.maroon.mixology.entity.Equipment;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.EquipmentResponse;
import com.maroon.mixology.exchange.response.brief.BriefEquipmentResponse;
import com.maroon.mixology.service.EquipmentServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tipsy/equipment")
public class EquipmentController {
    @Autowired
    private EquipmentServiceImpl equipmentService;

    @GetMapping("/{equipmentName}")
    public ResponseEntity<?> getEquipment(@PathVariable(value = "equipmentName") String equipmentName) {
        try{
            // We have the equipment Name, we can query this specifc one in the db
            Equipment equipment = equipmentService.findByName(equipmentName);
            EquipmentResponse equipmentResponse = new EquipmentResponse(
                equipment.getName(), 
                equipment.getImage(), 
                equipment.getType(), 
                equipment.getActionsDoTo(), 
                equipment.getActionsDoing());
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
            Set<BriefEquipmentResponse> equipmentResponses = new HashSet<BriefEquipmentResponse>();
            for (Equipment e : equipments){
                equipmentResponses.add(new BriefEquipmentResponse(
                    e.getName(), 
                    e.getImage(), 
                    e.getType())
                    );
            }
            return ResponseEntity.ok(equipmentResponses);
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Equipments were unable to be loaded. Error: " + e.toString()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}