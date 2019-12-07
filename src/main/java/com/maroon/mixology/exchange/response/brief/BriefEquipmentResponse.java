package com.maroon.mixology.exchange.response.brief;

import com.maroon.mixology.entity.type.EquipmentTypeEnum;

public class BriefEquipmentResponse {
    private String name;
    private String img;
    private String equipmentType;

    public BriefEquipmentResponse(String name, String img, String equipmentType) {
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

    public String getEquipmentType() {
        return equipmentType;
    }

    public void setEquipmentType(String equipmentType) {
        this.equipmentType = equipmentType;
    }





}