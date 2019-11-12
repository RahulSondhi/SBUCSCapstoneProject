package com.maroon.mixology.exchange.request;

import java.util.ArrayList;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.maroon.mixology.Helper;

public class BarRequest {
    @NotBlank
    @Size(min = 4, max = 32)
    private String name;
    private String description;
    //owner is handled by the current user
    private String img;
    private ArrayList<String> managers; //nicknames
    private ArrayList<String> workers; //nicknames
    private ArrayList<String> recipesAvaliable; //ids in base 64

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
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

    public ArrayList<String> getRecipesAvaliable() {
        ArrayList<String> realIds = new ArrayList<String>();
        for (String recipe : recipesAvaliable) {
            realIds.add(Helper.decodeBase64ToHex(recipe));
        }
        return realIds;
    }

    public void setRecipesAvaliable(ArrayList<String> recipesAvaliable) {
        this.recipesAvaliable = recipesAvaliable;
    }



}
