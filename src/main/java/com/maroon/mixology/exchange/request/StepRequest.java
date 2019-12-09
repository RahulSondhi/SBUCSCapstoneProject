package com.maroon.mixology.exchange.request;

public class StepRequest {
    private String equipmentToDo;
    private String equipmentDoing;
    private String equipmentProduct;
    private String action;
    private int value;
    private String unit;

    public String getEquipmentToDo() {
        return equipmentToDo;
    }

    public void setEquipmentToDo(String equipmentToDo) {
        this.equipmentToDo = equipmentToDo;
    }

    public String getEquipmentDoing() {
        return equipmentDoing;
    }

    public void setEquipmentDoing(String equipmentDoing) {
        this.equipmentDoing = equipmentDoing;
    }

    public String getEquipmentProduct() {
        return equipmentProduct;
    }

    public void setEquipmentProduct(String equipmentProduct) {
        this.equipmentProduct = equipmentProduct;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }


}
