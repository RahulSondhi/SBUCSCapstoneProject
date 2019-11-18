package com.maroon.mixology.controller.tipsy;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.maroon.mixology.entity.Unit;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.UnitResponse;
import com.maroon.mixology.service.UnitServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tipsy/unit")
public class UnitController {
    @Autowired
    private UnitServiceImpl unitService;

    @GetMapping("/getUnits")
    public ResponseEntity<?> getAllUnits() {
        try{
            List<Unit> units = unitService.findAll();
            Set<UnitResponse> unitResponses = new HashSet<UnitResponse>();
            for (Unit u : units){
                unitResponses.add(new UnitResponse(
                    u.getName(),
                    u.getMlMeasurement(),
                    u.getFlozMeasurement()
                    ));
            }
            return ResponseEntity.ok(unitResponses);
        } catch (Exception e) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Units were unable to be loaded. Error: " + e.toString()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}