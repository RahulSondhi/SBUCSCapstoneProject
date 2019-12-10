package com.maroon.mixology.exchange.response;

import java.util.Set;

public class EquipmentProductResponse {
    //we don't give them the ID
    private String name;
    private String img;
    private EquipmentTypeResponse equipmentType;
    private Set<String> tags;

    public EquipmentProductResponse(String name, String img, EquipmentTypeResponse equipmentType, Set<String> tags) {
        this.name = name;
        this.img = img;
        this.equipmentType = equipmentType;
        this.tags = tags;
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

    public EquipmentTypeResponse getEquipmentType() {
        return equipmentType;
    }

    public void setEquipmentType(EquipmentTypeResponse equipmentType) {
        this.equipmentType = equipmentType;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }

}