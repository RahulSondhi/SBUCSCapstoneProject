package com.maroon.mixology.controller.tipsy;

import java.util.ArrayList;
import java.util.List;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.entity.Equipment;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.brief.BriefBarResponse;
import com.maroon.mixology.exchange.response.brief.BriefEquipmentResponse;
import com.maroon.mixology.exchange.response.brief.BriefRecipeResponse;
import com.maroon.mixology.exchange.response.brief.BriefUserResponse;
import com.maroon.mixology.service.BarServiceImpl;
import com.maroon.mixology.service.EquipmentServiceImpl;
import com.maroon.mixology.service.RecipeServiceImpl;
import com.maroon.mixology.service.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/tipsy/search")
public class SearchController {
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private BarServiceImpl barService;

    @Autowired
    private RecipeServiceImpl recipeService;

    @Autowired
    private EquipmentServiceImpl equipmentService;
    
    private static final Logger logger = LoggerFactory.getLogger(SearchController.class);

    @GetMapping
    public ResponseEntity<?> search(@RequestParam(value = "type") String type, @RequestParam(value = "query") String query ) {
        try{
            switch(type){
                case "user":
                    ArrayList<BriefUserResponse> userRet = new ArrayList<BriefUserResponse>();
                    List<User> userResults = userService.findByNicknameLikeIgnoreCase(query);
                    for(User u : userResults){
                        userRet.add(new BriefUserResponse(
                            u.getNickname(), 
                            u.getFirstName() + " " + u.getLastName(), 
                            u.getProfilePic()
                            ));
                    }
                    if(userRet.isEmpty()){
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Your search '" + query + "' did not match any documents"),
                            HttpStatus.NOT_FOUND); 
                    }
                    else{
                        return ResponseEntity.ok(userRet);
                    }
                case "bar":
                    ArrayList<BriefBarResponse> barRet = new ArrayList<BriefBarResponse>();
                    List<Bar> barResults = barService.findByNameLikeIgnoreCase(query);
                    for(Bar b : barResults){
                        barRet.add(new BriefBarResponse(
                            b.getId(), 
                            b.getName(), 
                            b.getImage(), 
                            b.getOwner().getNickname()
                        ));
                    }
                    if(barRet.isEmpty()){
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Your search '" + query + "' did not match any documents"),
                            HttpStatus.NOT_FOUND); 
                    }
                    else{
                        return ResponseEntity.ok(barRet);
                    }
                case "recipe":
                    ArrayList<BriefRecipeResponse> recipeRet = new ArrayList<BriefRecipeResponse>();
                    List<Recipe> recipeResults = recipeService.findByNameLikeIgnoreCase(query);
                    for(Recipe r : recipeResults){
                        recipeRet.add(new BriefRecipeResponse(
                            r.getId(), 
                            r.getName(), 
                            r.getImage(), 
                            r.getAuthor().getNickname()
                        ));
                    }
                    if(recipeRet.isEmpty()){
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Your search '" + query + "' did not match any documents"),
                            HttpStatus.NOT_FOUND); 
                    }
                    else{
                        return ResponseEntity.ok(recipeRet);
                    }
                case "equipment":
                    ArrayList<BriefEquipmentResponse> equipmentRet = new ArrayList<BriefEquipmentResponse>();
                    List<Equipment> equipmentResults = equipmentService.findByNameLikeIgnoreCase(query);
                    for(Equipment e : equipmentResults){
                        equipmentRet.add(new BriefEquipmentResponse(
                            e.getName(), 
                            e.getImage(), 
                            e.getEquipmentType().getName()
                            ));
                    }
                    if(equipmentRet.isEmpty()){
                        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Your search '" + query + "' did not match any documents"),
                            HttpStatus.NOT_FOUND); 
                    }
                    else{
                        return ResponseEntity.ok(equipmentRet);
                    }
                default:
                    return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Type '" + type + "' did not match any known types"),
                HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            logger.error("Unable to complete the search with query '" + query + "'.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unable to complete the search with query '" + query + "'. Error: " + e.toString()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/getBrief")
    public ResponseEntity<?> getUserBrief(@RequestParam(value = "nickname") String nickname) {
        try{
            //we have to query the bar from Mongo
            User user = userService.findByNickname(nickname);
            if(user == null){
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Nickname '" + nickname + "' was not found!"),
                    HttpStatus.NOT_FOUND);
            }
            //now we return the brief responses
            return ResponseEntity.ok(new BriefUserResponse(
                user.getNickname(), 
                user.getFirstName() + " " + user.getLastName(), 
                user.getProfilePic()
            ));
        } catch (Exception e) {
            logger.error("User was unable to be loaded.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "User was unable to be loaded. Error: " + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/bar/getBrief")
    public ResponseEntity<?> getBarBrief(@RequestParam(value = "barID") String barID) {
        try{
            //we have to query the bar from Mongo
            Bar bar = barService.findById(barID);
            if(bar == null){
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Bar was not found!"),
                    HttpStatus.NOT_FOUND);
            }
            //now we return the brief responses
            return ResponseEntity.ok(new BriefBarResponse(
                bar.getId(), 
                bar.getName(), 
                bar.getImage(), 
                bar.getOwner().getNickname()
            ));
        } catch (Exception e) {
            logger.error("Bar was unable to be loaded.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Bar was unable to be loaded. Error: " + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/recipe/getBrief")
    public ResponseEntity<?> getRecipeBrief(@RequestParam(value = "recipeID") String recipeID) {
        try{
            //we have to query the bar from Mongo
            Recipe recipe = recipeService.findById(recipeID);
            if(recipe == null){
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Recipe was not found!"),
                    HttpStatus.NOT_FOUND);
            }
            //now we return the brief responses
            return ResponseEntity.ok(new BriefRecipeResponse(
                recipe.getId(), 
                recipe.getName(), 
                recipe.getImage(), 
                recipe.getAuthor().getNickname()
            ));
        } catch (Exception e) {
            logger.error("Recipe was unable to be loaded.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Recipe was unable to be loaded. Error: " + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/equipment/getBrief")
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