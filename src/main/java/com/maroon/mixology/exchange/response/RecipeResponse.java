package com.maroon.mixology.exchange.response;

import java.util.ArrayList;
import java.util.Set;

import com.maroon.mixology.exchange.response.brief.BriefUserResponse;

public class RecipeResponse {
    private String name;
    private String description;
    private String img;
    private BriefUserResponse author; 
    private boolean published;
    private ArrayList<StepResponse> steps;
    private Set<EquipmentResponse> equipmentsAvailable;

     public RecipeResponse(String name, String description, String img, BriefUserResponse author, boolean published,
            ArrayList<StepResponse> steps, Set<EquipmentResponse> equipmentsAvailable) {
        this.name = name;
        this.description = description;
        this.img = img;
        this.author = author;
        this.published = published;
        this.steps = steps;
        this.equipmentsAvailable = equipmentsAvailable;
    }

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

    public BriefUserResponse getAuthor() {
        return author;
    }

    public void setAuthor(BriefUserResponse author) {
        this.author = author;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public ArrayList<StepResponse> getSteps() {
        return steps;
    }

    public void setSteps(ArrayList<StepResponse> steps) {
        this.steps = steps;
    }

    public Set<EquipmentResponse> getEquipmentsAvailable() {
        return equipmentsAvailable;
    }

    public void setEquipmentsAvailable(Set<EquipmentResponse> equipmentsAvailable) {
        this.equipmentsAvailable = equipmentsAvailable;
    }




}