package com.maroon.mixology.exchange.response;


public class EquipmentResponse {
    //we don't give them the ID
    private String name;
    private String img;
    private EquipmentTypeResponse equipmentType;

    public EquipmentResponse(String name, String img, EquipmentTypeResponse equipmentType) {
        this.name = name;
        this.img = img;
        this.equipmentType = equipmentType;
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



}