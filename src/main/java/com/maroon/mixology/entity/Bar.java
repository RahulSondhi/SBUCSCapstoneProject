package com.maroon.mixology.entity;

import java.util.ArrayList;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bar")
public class Bar {
    @Id
    private String id;
    @Indexed(unique = true, direction = IndexDirection.DESCENDING, dropDups = true)
    private String name;
    private String image;
    @DBRef
    private User owner;
    @DBRef
    private Set<User> managers;
    @DBRef
    private Set<User> workers;
    @DBRef
    private ArrayList<Recipe> recipesAvaliable;

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

    public ArrayList<Recipe> getRecipesAvaliable(){
        return recipesAvaliable;
    }

    public void setRecipes(ArrayList<Recipe> recipesAvaliable){
        this.recipesAvaliable = recipesAvaliable;
    }
}