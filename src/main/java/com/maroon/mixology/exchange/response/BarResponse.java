package com.maroon.mixology.exchange.response;

import java.util.Set;

import com.maroon.mixology.exchange.response.brief.BriefRecipeResponse;
import com.maroon.mixology.exchange.response.brief.BriefUserResponse;

public class BarResponse {
    //we don't give them the ID
    private String name;
    private String img;
    private String owner;
    private Set<BriefUserResponse> managers;
    private Set<BriefUserResponse> workers;
    private Set<BriefRecipeResponse> recipesAvaliable;

    public BarResponse(String name, String img, String owner, Set<BriefUserResponse> managers,
            Set<BriefUserResponse> workers, Set<BriefRecipeResponse> recipesAvaliable) {
        this.name = name;
        this.img = img;
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

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public Set<BriefUserResponse> getManagers() {
        return managers;
    }

    public void setManagers(Set<BriefUserResponse> managers) {
        this.managers = managers;
    }

    public Set<BriefUserResponse> getWorkers() {
        return workers;
    }

    public void setWorkers(Set<BriefUserResponse> workers) {
        this.workers = workers;
    }

    public Set<BriefRecipeResponse> getRecipesAvaliable() {
        return recipesAvaliable;
    }

    public void setRecipesAvaliable(Set<BriefRecipeResponse> recipesAvaliable) {
        this.recipesAvaliable = recipesAvaliable;
    }

}