package com.maroon.mixology.exchange.response.brief;

import com.maroon.mixology.entity.type.EquipmentTypeEnum;

public class BriefEquipmentResponse {
    private String name;
    private String img;
    private EquipmentTypeEnum equipmentType;

    public BriefEquipmentResponse(String name, String img, EquipmentTypeEnum equipmentType) {
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

    public EquipmentTypeEnum getEquipmentType() {
        return equipmentType;
    }

    public void setEquipmentType(EquipmentTypeEnum equipmentType) {
        this.equipmentType = equipmentType;
    }





}