package com.maroon.mixology.entity;

import java.util.ArrayList;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="user")
public class User {
    @Id
    private String id;
	private String firstName;
	private String lastName;
	@Indexed(unique = true, direction = IndexDirection.DESCENDING, dropDups = true)
	private String email;
    private String password;
    private String passwordConfirm;
	private String confirmationToken;
	private String resetToken;
	private boolean enabled;
    @DBRef
    private Set<Role> roles;
    @DBRef
    private ArrayList<Bar> bars;
    @DBRef
	private ArrayList<Recipe> recipes_Written;
	@DBRef
	private ArrayList<Recipe> recipes_Incompleted;
	@DBRef
	private ArrayList<Recipe> recipes_Completed;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
    }
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

    public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
    }

	public String getPasswordConfirm() {
		return passwordConfirm;
	}

	public void setPasswordConfirm(String passwordConfirm) {
		this.passwordConfirm = passwordConfirm;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

    public String getConfirmationToken() {
		return confirmationToken;
	}

	public void setConfirmationToken(String confirmationToken) {
		this.confirmationToken = confirmationToken;
	}

	public String getResetToken() {
		return resetToken;
	}

	public void setResetToken(String resetToken) {
		this.resetToken = resetToken;
	}

	public boolean getEnabled(){
		return enabled;
	}

	public void setEnabled(boolean enabled){
		this.enabled = enabled;
	}
	public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
	}
	
	public ArrayList<Bar> getBars(){
        return bars;
    }

    public void setBars(ArrayList<Bar> bars){
        this.bars = bars;
	}
	
	public ArrayList<Recipe> getRecipes_Written(){
        return recipes_Written;
    }

    public void setRecipes_Written(ArrayList<Recipe> recipes_Written){
        this.recipes_Written = recipes_Written;
    }
	
	public ArrayList<Recipe> getRecipes_Incompleted(){
        return recipes_Incompleted;
    }

    public void setRecipes_Incompleted(ArrayList<Recipe> recipes_Incompleted){
        this.recipes_Incompleted = recipes_Incompleted;
	}
	
	public ArrayList<Recipe> getRecipes_Completed(){
        return recipes_Completed;
    }

    public void setRecipes_Completed(ArrayList<Recipe> recipes_Completed){
        this.recipes_Completed = recipes_Completed;
    }

}