package com.maroon.mixology.exchange.request;


public class EquipmentRequest {
    private String name;
    private String img;
    private String equipmentType;

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

    public String getEquipmentType() {
        return equipmentType;
    }

    public void setEquipmentTypeName(String equipmentType) {
        this.equipmentType = equipmentType;
    }


}
