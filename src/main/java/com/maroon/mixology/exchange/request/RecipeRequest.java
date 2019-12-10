package com.maroon.mixology.exchange.request;

import java.util.ArrayList;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class RecipeRequest {
    @NotBlank
    @Size(min = 4, max = 32)
    private String name;
    private String description;
    private String img;
    //author is handled by the current user
    private Boolean published;
    private ArrayList<StepRequest> steps;
    private Boolean newSteps;
    private Set<EquipmentRequest> equipmentsAvailable;
    private Boolean newEquipment;
    private Set<EquipmentProductRequest> equipmentProducts;
    
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

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public ArrayList<StepRequest> getSteps() {
        return steps;
    }

    public void setSteps(ArrayList<StepRequest> steps) {
        this.steps = steps;
    }

    public Set<EquipmentRequest> getEquipmentsAvailable() {
        return equipmentsAvailable;
    }

    public void setEquipmentsAvailable(Set<EquipmentRequest> equipmentsAvailable) {
        this.equipmentsAvailable = equipmentsAvailable;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getNewSteps() {
        return newSteps;
    }

    public void setNewSteps(Boolean newSteps) {
        this.newSteps = newSteps;
    }

    public Boolean getNewEquipment() {
        return newEquipment;
    }

    public void setNewEquipment(Boolean newEquipment) {
        this.newEquipment = newEquipment;
    }

    public Set<EquipmentProductRequest> getEquipmentProducts() {
        return equipmentProducts;
    }

    public void setEquipmentProducts(Set<EquipmentProductRequest> equipmentProducts) {
        this.equipmentProducts = equipmentProducts;
    }


}
