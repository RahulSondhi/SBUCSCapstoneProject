package com.maroon.mixology.exchange.request;

import java.util.ArrayList;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class RecipeRequest {
    @NotBlank
    @Size(min = 4, max = 32)
    private String name;
    private String img;
    //author is handled by the current user
    private Boolean published;
    private ArrayList<StepRequest> steps;
    private Set<EquipmentRequest> equipmentsAvailable;

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


}
