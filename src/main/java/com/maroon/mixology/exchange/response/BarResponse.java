package com.maroon.mixology.exchange.response;

import java.util.ArrayList;

public class BarResponse {
    private String name;
    private String image;
    private String owner;
    private ArrayList<String> managers;
    private ArrayList<String> workers;
    private ArrayList<RecipeResponse> recipesAvaliable;

    public BarResponse(String name, String image, String owner, ArrayList<String> managers, ArrayList<String> workers, ArrayList<RecipeResponse> recipesAvaliable) {
        this.name = name;
        this.image = image;
        this.owner = owner;
        this.managers = managers;
        this.workers = workers;
        this.recipesAvaliable = recipesAvaliable;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public ArrayList<String> getManagers() {
        return managers;
    }

    public void setManagers(ArrayList<String> managers) {
        this.managers = managers;
    }

    public ArrayList<String> getWorkers() {
        return workers;
    }

    public void setWorkers(ArrayList<String> workers) {
        this.workers = workers;
    }

    public ArrayList<RecipeResponse> getRecipesAvaliable() {
        return recipesAvaliable;
    }

    public void setRecipesAvaliable(ArrayList<RecipeResponse> recipesAvaliable) {
        this.recipesAvaliable = recipesAvaliable;
    }


}