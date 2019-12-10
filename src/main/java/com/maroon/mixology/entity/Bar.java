package com.maroon.mixology.entity;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bar")
public class Bar {
    @Id
    private String id;
    private String name;
    private String description;
    @DBRef
    private User owner;
    private String image;
    @DBRef
    private Set<User> managers;
    @DBRef
    private Set<User> workers;
    @DBRef
    private Set<Recipe> recipesAvailable;

    public Bar(String name, String description, User owner, String image, Set<User> managers, Set<User> workers,
            Set<Recipe> recipesAvailable) {
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.image = image;
        this.managers = managers;
        this.workers = workers;
        this.recipesAvailable = recipesAvailable;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public User getOwner(){
        return owner;
    }

    public void setOwner(User owner){
        this.owner = owner;
    }

    public Set<User> getManagers(){
        return managers;
    }

    public void setManagers(Set<User> managers){
        this.managers = managers;
    }

    public Set<User> getWorkers(){
        return workers;
    }

    public void setWorkers(Set<User> workers){
        this.workers = workers;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Recipe> getRecipesAvailable() {
        return recipesAvailable;
    }

    public void setRecipesAvailable(Set<Recipe> recipesAvailable) {
        this.recipesAvailable = recipesAvailable;
    }

    public Set<String> getManagersNames(){
        
        Set<String> names = new HashSet<String>(); ;

        for (User user : this.getManagers()){
            names.add(user.getNickname());
        }
        return(names);
    }

    public Set<String> getWorkersNames(){
        
        Set<String> names = new HashSet<String>(); ;

        for (User user : this.getWorkers()){
            names.add(user.getNickname());
        }
        return(names);
    }

}