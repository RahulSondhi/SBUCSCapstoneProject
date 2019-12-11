package com.maroon.mixology.controller.tipsy;

import java.util.ArrayList;

import javax.validation.Valid;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.entity.Game;
import com.maroon.mixology.entity.Recipe;
import com.maroon.mixology.entity.Step;
import com.maroon.mixology.exchange.request.GameRequest;
import com.maroon.mixology.exchange.response.ApiResponse;
import com.maroon.mixology.exchange.response.GameResponse;
import com.maroon.mixology.exchange.response.RecipeResponse;
import com.maroon.mixology.exchange.response.StepResponse;
import com.maroon.mixology.exchange.response.UnitResponse;
import com.maroon.mixology.exchange.response.brief.BriefUserResponse;
import com.maroon.mixology.repository.GameRepository;
import com.maroon.mixology.security.CurrentUser;
import com.maroon.mixology.service.GameService;
import com.maroon.mixology.service.UserService;

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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/tipsy/game")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserService userService;
    
    @Autowired
    private GameService gameService;

    private static final Logger logger = LoggerFactory.getLogger(GameController.class);


    @GetMapping("/{gameID}")
    public ResponseEntity<?> getGame(@CurrentUser UserDetails currentUser, @PathVariable(value = "gameID") String gameID) {
        try{
            User player = userService.findByEmail(currentUser.getUsername());
            //we have to query the game from Mongo
            Game game = gameService.findById(gameID);
            if(game == null){
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Game with the ID \"" + gameID +"\" was not found."),
                HttpStatus.NOT_FOUND);
            }
            // We have the game, now lets build a game Response
            // Unless you are the player, you can't request the game
            if(game.getPlayer().getId().equals(player.getId())){
                //Build a RecipeResponse
                Recipe recipe = game.getRecipe();
                BriefUserResponse author = new BriefUserResponse(
                    recipe.getAuthor().getNickname(), 
                    recipe.getAuthor().getFirstName() + " " + recipe.getAuthor().getLastName(), 
                    recipe.getAuthor().getProfilePic()
                    );

                //Need to build Steps
                ArrayList<StepResponse> steps = new ArrayList<StepResponse>();
                for (Step s : recipe.getSteps()){
                    steps.add(new StepResponse(
                        s.getEquipmentToDo(),
                        s.getEquipmentDoing(),
                        s.getEquipmentProduct(),
                        s.getAction(),
                        s.getValue(),
                        new UnitResponse(
                            s.getUnit().getName(), 
                            s.getUnit().getType(),
                            s.getUnit().getUsMeasurement(), 
                            s.getUnit().getMetricMeasurement()) 
                        ));
                }
                //lets build our recipe response
                RecipeResponse recipeResponse = new RecipeResponse(
                    recipe.getName(),
                    recipe.getDescription(),
                    recipe.getImage(),
                    author,
                    recipe.isPublished(),
                    steps, //StepResponses 
                    recipe.getEquipmentsAvailable(), //EquipmentResponses
                    recipe.getEquipmentProducts() //EquipmentProductResponses
                );
                //lets build our Game response
                GameResponse gameResponse = new GameResponse(
                    recipeResponse,
                    game.getProgress(),
                    game.isCompleted()
                );
                return ResponseEntity.ok(gameResponse);
            }
            else{
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unauthorized request to access Game. Only the player may load this game."),
                        HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            logger.error("Game was unable to be loaded.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Game was unable to be loaded. Error: " + e.toString()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{gameID}/save")
    public ResponseEntity<?> saveGame(@PathVariable(value = "gameID") String gameID, @CurrentUser UserDetails currentUser, @Valid @RequestBody GameRequest gameRequest) {
        try{
            // we get the current user by getting their email address
            User player = userService.findByEmail(currentUser.getUsername());
            //Find our game
            Game game = gameService.findById(gameID);
            if(game == null){
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Game with the ID \"" + gameID +"\" was not found."),
                HttpStatus.NOT_FOUND);
            }
            //check if the requester is the player
            if(game.getPlayer().getId().equals(player.getId())){
                //Save Progress
                game.setProgress(gameRequest.getProgress());
                game.setCompleted(gameRequest.isCompleted());
                gameRepository.save(game); //save game
                return ResponseEntity.ok(new ApiResponse(true, "Your game was succesfully saved!"));
            }
            else{
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unauthorized request to save Game. Only the player may save this game."), 
                    HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            logger.error("Game was unable to be saved. Error:", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Game was unable to be saved. Error:" + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }  
    }

    @PostMapping("/{gameID}/forfeit")
    public ResponseEntity<?> forfeitGame(@PathVariable(value = "gameID") String gameID, @CurrentUser UserDetails currentUser) {
        try{
            // we get the current user by getting their email address
            User player = userService.findByEmail(currentUser.getUsername());
            //Find our game
            Game game = gameService.findById(gameID);
            if(game == null){
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Game with the ID \"" + gameID +"\" was not found."),
                HttpStatus.NOT_FOUND);
            }
            //check if the requester is the player
            if(game.getPlayer().getId().equals(player.getId())){
                gameRepository.delete(game); //delete game
                return ResponseEntity.ok(new ApiResponse(true, "Game was succesfully forfeited!"));
            }
            else{
                return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unauthorized request to forfeit Game. Only the player may forfeit this game."), 
                    HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            logger.error("Game was unable to be deleted.", e);
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Game was unable to be forfeited. Error: " + e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
        }  
    }


}