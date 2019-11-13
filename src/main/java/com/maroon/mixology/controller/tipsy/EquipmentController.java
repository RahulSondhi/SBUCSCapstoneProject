package com.maroon.mixology.controller.tipsy;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.entity.Equipment;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.exchange.request.BarRequest;
import com.maroon.mixology.exchange.request.RecipeRequest;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.EquipmentResponse;
import com.maroon.mixology.repository.BarRepository;
import com.maroon.mixology.repository.RecipeRepository;
import com.maroon.mixology.repository.UserRepository;
import com.maroon.mixology.security.CurrentUser;
import com.maroon.mixology.service.EquipmentServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

}