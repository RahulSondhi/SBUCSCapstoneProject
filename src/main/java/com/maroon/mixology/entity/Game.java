package com.maroon.mixology.entity;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "game")
public class Game {
    @Id
    private String id;
    @DBRef
    private User player;
    @DBRef
    private Recipe recipe;
    private ArrayList<Integer> progress;
    private boolean completed; 

    public Game(User player, Recipe recipe, ArrayList<Integer> progress, boolean completed) {
        this.player = player;
        this.recipe = recipe;
        this.progress = progress;
        this.completed = completed;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getPlayer() {
        return player;
    }

    public void setPlayer(User player) {
        this.player = player;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public ArrayList<Integer> getProgress() {
        return progress;
    }

    public void setProgress(ArrayList<Integer> progress) {
        this.progress = progress;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }




}