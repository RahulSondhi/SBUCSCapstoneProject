package com.maroon.mixology.controller;

import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.maroon.mixology.config.CustomAuthenticationSuccessHandler;
import com.maroon.mixology.entity.User;
import com.maroon.mixology.service.EmailService;
import com.maroon.mixology.service.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class UserController{
    @Autowired
    private UserServiceImpl userService;
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @Autowired
    private CustomAuthenticationSuccessHandler CustomAuthenticationSuccessHandler;
    
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ModelAndView handleMissingParams(MissingServletRequestParameterException ex) {
        return new ModelAndView("redirect:login");
    }
    
    // POST reset template
    @PostMapping({"/reset"})
    public ModelAndView resetforgottenPassword(ModelAndView modelAndView, @RequestParam Map<String, String> requestParams, RedirectAttributes redir) {
        
        // Find the user associated with the reset token
        User user = userService.findByResetToken(requestParams.get("token"));
        
        // This should always be non-null but we check just in case
        if (user != null) {
            
            // Set new password    
            user.setPassword(bCryptPasswordEncoder.encode(requestParams.get("password")));
            
            // Set the reset token to null so it cannot be used again
            user.setResetToken(null);
            
            // Save user
            userService.saveUser(user);
            
            // In order to set a model attribute on a redirect, we must use
            // RedirectAttributes
            redir.addFlashAttribute("successMessage", "You have successfully reset your password.  You may now login.");
            
            modelAndView.setViewName("redirect:login");
            return modelAndView;
            
        } else {
            modelAndView.addObject("errorMessage", "Oops!  This is an invalid password reset link.");
            modelAndView.setViewName("resetPassword");	
        }
        
        return modelAndView;
    }
    
    // GET reset template
    @RequestMapping(value = "/reset", method = RequestMethod.GET)
    public ModelAndView displayResetPasswordPage(ModelAndView modelAndView, @RequestParam("token") String token) {
        
        User user = userService.findByResetToken(token);
        
        if (user != null) { // Token found in DB
            modelAndView.addObject("resetToken", token);
        } else { // Token not found in DB
            modelAndView.addObject("errorMessage", "Oops!  This is an invalid password reset link.");
        }
        
        modelAndView.setViewName("resetPassword");
        return modelAndView;
    }
    
    
    // POST forget template
    @PostMapping({"/forgot"})
    public ModelAndView processForgotPasswordForm(ModelAndView modelAndView, @RequestParam("email") String userEmail, HttpServletRequest request) {
        
        // Lookup user in database by e-mail
        User user = userService.findByEmail(userEmail);
        
        if (user == null) {
            modelAndView.addObject("errorMessage", "We didn't find an account with that e-mail address.");
        } else {
            // Generate random 36-character string token for reset password 
            user.setResetToken(UUID.randomUUID().toString());
            
            // Save token to database
            userService.saveUser(user);
            
            String appUrl = request.getScheme() + "://" + request.getServerName();
            
            // Email message
            SimpleMailMessage passwordResetEmail = new SimpleMailMessage();
            passwordResetEmail.setFrom("tipsywebhelper@gmail.com");
            passwordResetEmail.setTo(user.getEmail());
            passwordResetEmail.setSubject("Password Reset Request");
            passwordResetEmail.setText("To reset your password, click the link below:\n" + appUrl
            + "/reset?token=" + user.getResetToken());
            // send the email
            emailService.sendEmail(passwordResetEmail);
            
            // Add success message to view
            modelAndView.addObject("successMessage", "A password reset link has been sent to " + userEmail);
        }
        
        modelAndView.setViewName("forgot"); //error?
        return modelAndView;
        
    }    
    
    // GET forget template
    @GetMapping({"/forgot"})
    public ModelAndView displayForgotPasswordPage() {
        return new ModelAndView("forgotPassword");
    }
    
    // POST confirm template
    @PostMapping({"/confirm"})
    public ModelAndView processConfirmationForm(ModelAndView modelAndView, BindingResult bindingResult, @RequestParam Map<String, String> requestParams, RedirectAttributes redir) {
        
        modelAndView.setViewName("confirm");
        // Find the user associated with the reset token
        User user = userService.findByConfirmationToken(requestParams.get("token"));
        
        // Set user to enabled
        user.setEnabled(true);
        
        // Save user
        userService.saveUser(user);
        
        modelAndView.addObject("successMessage", "Your registeration is now complete! Your account is now avaliable for login");
        return modelAndView;		
    }
    
    
    //GET confirm template
    @GetMapping({"/confirm"})
    public ModelAndView showConfirmationPage(ModelAndView modelAndView, @RequestParam("token") String token) {
        
        User user = userService.findByConfirmationToken(token);
        
        if (user == null) { // No token found in Mongo
            modelAndView.addObject("invalidToken", "Oops!  This is an invalid confirmation link.");
        } else { // Token found
            modelAndView.addObject("confirmationToken", user.getConfirmationToken());
        }
        
        modelAndView.setViewName("confirm");
        return modelAndView;		
    }
    
    //POST register template
    @PostMapping({"/register"})
    public String registerUserAccount(@ModelAttribute("userForm") @Valid User userForm, BindingResult bindingResult, Model model, HttpServletRequest request) {
        //Check for NULL
        if (userForm.getFirstName().trim().isEmpty()){
            bindingResult.rejectValue("firstname", "blank");
            model.addAttribute("blankError", "Please fill in your first name.");
        }
        if (userForm.getLastName().trim().isEmpty()){
            bindingResult.rejectValue("lastname", "blank");
            model.addAttribute("blankError", "Please fill in your last name.");
        }
        if (userForm.getEmail().trim().isEmpty()){
            bindingResult.rejectValue("email", "blank");
            model.addAttribute("blankError", "Please fill in your email address.");
        }
        if (userForm.getPassword().trim().isEmpty()){
            bindingResult.rejectValue("password", "blank");
            model.addAttribute("blankError", "Please fill in your password.");
        }
        if (userForm.getPasswordConfirm().trim().isEmpty()){
            bindingResult.rejectValue("passwordConfirm", "blank");
            model.addAttribute("blankError", "Please confirm your password.");
        }
        else {
            //Check for duplicate user
            User userExists = userService.findByEmail(userForm.getEmail());
            if (userExists != null) {
                bindingResult.rejectValue("email", "error.user", "duplicate username");
                model.addAttribute("userDupError", "That email is already registered to a user. Please use another email address.");
            }
            //Check if password and password confirm match
            if (!userForm.getPasswordConfirm().equals(userForm.getPassword())) {
                bindingResult.rejectValue("password", "nonmatching password");
                bindingResult.rejectValue("passwordConfirm", "nonmatching password");
                model.addAttribute("passwordMatchError", "Passwords do not match.");
            }
        }
        if (bindingResult.hasErrors()) {
            // Return the page with errors
            return "register";
        } else {
            // All input data passed
            // Build user
            // Disable user until they click on confirmation link in email
            userForm.setEnabled(false);
            // Generate random 36-character string token for confirmation link
            userForm.setConfirmationToken(UUID.randomUUID().toString());
            // Set new password
            String hash = bCryptPasswordEncoder.encode(userForm.getPassword());
            userForm.setPassword(hash);
            userForm.setPasswordConfirm(hash);
            // Save the new User
            userService.saveUser(userForm);
            // Send a confirmation email
            //Should this also include the port number(?)
            String appUrl = request.getScheme() + "://" + request.getServerName();
            
            SimpleMailMessage registrationEmail = new SimpleMailMessage();
            registrationEmail.setFrom("tipsywebhelper@gmail.com");
            registrationEmail.setTo(userForm.getEmail());
            registrationEmail.setSubject("Registration Confirmation");
            registrationEmail.setText("To confirm your e-mail address, please click the link below:\n"
            + appUrl + "/confirm?token=" + userForm.getConfirmationToken());
            System.out.println("Post email setup " + registrationEmail);
            emailService.sendEmail(registrationEmail);
            // Notify the user that an email has been sent
            model.addAttribute("confirmationMessage", "A confirmation e-mail has been sent to " + userForm.getEmail());
        }
        return "register";
    }
    //POST login template
    //@PostMapping("/login")
    //public String login();
    //handled by Spring Security
    
    //GET register template
    @GetMapping("/register")
    public String showRegistrationPage(Model model) {
        return "register";
    }
    
    //GET login template
    @GetMapping("/login")
    public String login(Model model, String error, String logout) {
        if (error != null) {
            model.addAttribute("error", "Invalid username and password");
        }
        if (logout != null) {
            model.addAttribute("message", "You have been logged out successfully.");
        }
        return "login";
    }
    
    //GET index template
    @GetMapping({"/index", "/"})
    public String index() {
        return "index";
    }
}