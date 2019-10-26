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
	@Indexed(unique = true, direction = IndexDirection.DESCENDING, dropDups = true)
	private String nickname;
    private String password;
	private String confirmationTokenUUID;
	private Long confirmationTokenCreationTime;
	private String resetTokenUUID;
	private Long resetTokenCreationTime;
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

	public User(String firstName, String lastName, String email, String nickname, String password) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.nickname = nickname;
		this.password = password;
	}

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
	
	public String getNickname(){
		return nickname;	
	}

	public void setNickname(String nickname){
		this.nickname = nickname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

    public String getConfirmationTokenUUID() {
        return confirmationTokenUUID;
    }

    public void setConfirmationTokenUUID(String confirmationTokenUUID) {
        this.confirmationTokenUUID = confirmationTokenUUID;
	}
	
    public Long getConfirmationTokenCreationTime() {
        return confirmationTokenCreationTime;
    }

    public void setConfirmationTokenCreationTime(Long confirmationTokenCreationTime) {
        this.confirmationTokenCreationTime = confirmationTokenCreationTime;
    }

    public String getResetTokenUUID() {
        return resetTokenUUID;
    }

    public void setResetTokenUUID(String resetTokenUUID) {
        this.resetTokenUUID = resetTokenUUID;
    }

    public Long getResetTokenCreationTime() {
        return resetTokenCreationTime;
    }

    public void setResetTokenCreationTime(Long resetTokenCreationTime) {
        this.resetTokenCreationTime = resetTokenCreationTime;
    }

	public boolean isEnabled() {
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