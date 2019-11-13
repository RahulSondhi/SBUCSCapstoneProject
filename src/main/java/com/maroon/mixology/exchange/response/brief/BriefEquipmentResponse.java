package com.maroon.mixology.exchange.response.brief;

import com.maroon.mixology.entity.type.EquipmentType;

public class BriefEquipmentResponse {
    private String name;
    private String img;
    private EquipmentType type;

    public BriefEquipmentResponse(String name, String img, EquipmentType type) {
        this.name = name;
        this.img = img;
        this.type = type;
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

    public EquipmentType getType() {
        return type;
    }

    public void setType(EquipmentType type) {
        this.type = type;
    }






}