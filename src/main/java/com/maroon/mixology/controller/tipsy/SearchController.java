// package com.maroon.mixology.controller.tipsy;

// import java.util.ArrayList;
// import java.util.HashSet;
// import java.util.Set;

// import javax.validation.Valid;

// import com.maroon.mixology.entity.User;
// import com.maroon.mixology.entity.type.ActionType;
// import com.maroon.mixology.entity.Bar;
// import com.maroon.mixology.entity.Equipment;
// import com.maroon.mixology.entity.Recipe;
// import com.maroon.mixology.entity.Role;
// import com.maroon.mixology.entity.Step;
// import com.maroon.mixology.exchange.request.BarRequest;
// import com.maroon.mixology.exchange.request.EquipmentRequest;
// import com.maroon.mixology.exchange.request.RecipeRequest;
// import com.maroon.mixology.exchange.request.StepRequest;
// import com.maroon.mixology.exchange.response.ApiResponse;
// import com.maroon.mixology.exchange.response.EquipmentResponse;
// import com.maroon.mixology.exchange.response.EquipmentTypeResponse;
// import com.maroon.mixology.exchange.response.RecipeResponse;
// import com.maroon.mixology.exchange.response.StepResponse;
// import com.maroon.mixology.exchange.response.UnitResponse;
// import com.maroon.mixology.exchange.response.brief.BriefEquipmentResponse;
// import com.maroon.mixology.exchange.response.brief.BriefUserResponse;
// import com.maroon.mixology.repository.BarRepository;
// import com.maroon.mixology.repository.RecipeRepository;
// import com.maroon.mixology.repository.StepRepository;
// import com.maroon.mixology.repository.UserRepository;
// import com.maroon.mixology.security.CurrentUser;
// import com.maroon.mixology.service.EquipmentTypeServiceImpl;
// import com.maroon.mixology.service.RecipeService;
// import com.maroon.mixology.service.RecipeServiceImpl;
// import com.maroon.mixology.service.UnitServiceImpl;
// import com.maroon.mixology.service.UserServiceImpl;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

// @RestController
// @RequestMapping("/tipsy/search")
// public class SearchController {
//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private RecipeRepository recipeRepository;

//     @Autowired
//     private StepRepository stepRepository;

//     @Autowired
//     private UserServiceImpl userService;

//     @Autowired
//     private RecipeServiceImpl recipeService;

//     @Autowired
//     private EquipmentTypeServiceImpl equipmentTypeService;

//     @Autowired
//     private UnitServiceImpl unitService;
    
//     private static final Logger logger = LoggerFactory.getLogger(BarController.class);

//     @GetMapping
//     public ResponseEntity<?> search(@RequestParam(value = "type") String type, @RequestParam(value = "query") String query ) {
//         try{
//             if(1==2){
//                 Set<?> generic = new HashSet<?>();
//                 return ResponseEntity.ok(recipeResponse);
//             }
//             else{
//                 return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Your search '" + query + "' did not match any documents"),
//                         HttpStatus.NOT_FOUND);
//             }
//         } catch (Exception e) {
//             logger.error("Unable to complete the search", e);
//             return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unable to complete the search. Error: " + e.toString()),
//                         HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }


    
// }