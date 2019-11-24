package com.maroon.mixology.exchange.response;

import com.maroon.mixology.entity.type.ActionType;

public class StepResponse {
      private String equipmentToDo;
      private String equipmentDoing;
      private String equipmentProduct;
      private ActionType action;
      private int value;
      private UnitResponse unit;

    public StepResponse(String equipmentToDo, String equipmentDoing, String equipmentProduct, ActionType action,
            int value, UnitResponse unit) {
        this.equipmentToDo = equipmentToDo;
        this.equipmentDoing = equipmentDoing;
        this.equipmentProduct = equipmentProduct;
        this.action = action;
        this.value = value;
        this.unit = unit;
    }

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

    public ActionType getAction() {
        return action;
    }

    public void setAction(ActionType action) {
        this.action = action;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public UnitResponse getUnit() {
        return unit;
    }

    public void setUnit(UnitResponse unit) {
        this.unit = unit;
    }

}