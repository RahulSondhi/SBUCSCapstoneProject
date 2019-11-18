package com.maroon.mixology.exchange.response;

import java.util.ArrayList;
import java.util.Set;

import com.maroon.mixology.exchange.response.brief.BriefEquipmentResponse;
import com.maroon.mixology.exchange.response.brief.BriefUserResponse;

public class RecipeResponse {
    private String name;
    private String img;
    private BriefUserResponse author; 
    private boolean published;
    private ArrayList<StepResponse> steps;
    private Set<BriefEquipmentResponse> equipments;
    private Set<BriefEquipmentResponse> customEquipments;

    public RecipeResponse(String name, String img, BriefUserResponse author, boolean published,
            ArrayList<StepResponse> steps, Set<BriefEquipmentResponse> equipments, Set<BriefEquipmentResponse> customEquipments) {
        this.name = name;
        this.img = img;
        this.author = author;
        this.published = published;
        this.steps = steps;
        this.equipments = equipments;
        this.customEquipments = customEquipments;
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

    public Set<BriefEquipmentResponse> getEquipments() {
        return equipments;
    }

    public void setEquipments(Set<BriefEquipmentResponse> equipments) {
        this.equipments = equipments;
    }

    public Set<BriefEquipmentResponse> getCustomEquipments() {
        return customEquipments;
    }

    public void setCustomEquipments(Set<BriefEquipmentResponse> customEquipments) {
        this.customEquipments = customEquipments;
    }
    
}