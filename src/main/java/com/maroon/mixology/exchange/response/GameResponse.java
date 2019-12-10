package com.maroon.mixology.exchange.response;

import java.util.ArrayList;

public class GameResponse {
    private RecipeResponse recipe;
    private ArrayList<Integer> progress;
    private boolean completed;

    public GameResponse(RecipeResponse recipe, ArrayList<Integer> progress, boolean completed) {
        this.recipe = recipe;
        this.progress = progress;
        this.completed = completed;
    }
    public RecipeResponse getRecipe() {
        return recipe;
    }

    public void setRecipe(RecipeResponse recipe) {
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