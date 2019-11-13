package com.maroon.mixology.exchange.request;

import java.util.HashSet;
import java.util.Set;

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
    private Set<String> managers; //nicknames
    private Set<String> workers; //nicknames
    private Set<String> recipesAvailable; //ids in base 64

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

    public Set<String> getManagers() {
        return managers;
    }

    public void setManagers(Set<String> managers) {
        this.managers = managers;
    }

    public Set<String> getWorkers() {
        return workers;
    }

    public void setWorkers(Set<String> workers) {
        this.workers = workers;
    }

    public Set<String> getRecipesAvailable() {
        // Set<String> realIds = new HashSet<String>();
        // for (String recipe : recipesAvailable) {
        //     realIds.add(Helper.decodeBase64ToHex(recipe));
        // }
        // return realIds;
        return recipesAvailable;
    }

    public void setRecipesAvailable(Set<String> recipesAvailable) {
        this.recipesAvailable = recipesAvailable;
    }



}
