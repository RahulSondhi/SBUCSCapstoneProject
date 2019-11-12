package com.maroon.mixology.entity;

import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "userRecipe")
public class UserRecipe {
    @Id
    private String id;
    @DBRef
    private User user;
    @DBRef
    private Recipe recipe;
    @DBRef
    private Set<Step> stepsCompleted;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public Set<Step> getStepsCompleted() {
        return stepsCompleted;
    }

    public void setStepsCompleted(Set<Step> stepsCompleted) {
        this.stepsCompleted = stepsCompleted;
    }

}