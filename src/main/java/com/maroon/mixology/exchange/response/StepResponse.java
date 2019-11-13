package com.maroon.mixology.exchange.response;

import com.maroon.mixology.entity.type.ActionType;

public class StepResponse {
      private EquipmentResponse objToDo;
      private EquipmentResponse objDoing;
      private ActionType action;
      private int value;
      private UnitResponse unit;

    public StepResponse(EquipmentResponse objToDo, EquipmentResponse objDoing, ActionType action, int value,
            UnitResponse unit) {
        this.objToDo = objToDo;
        this.objDoing = objDoing;
        this.action = action;
        this.value = value;
        this.unit = unit;
    }

    public EquipmentResponse getObjToDo() {
        return objToDo;
    }

    public void setObjToDo(EquipmentResponse objToDo) {
        this.objToDo = objToDo;
    }

    public EquipmentResponse getObjDoing() {
        return objDoing;
    }

    public void setObjDoing(EquipmentResponse objDoing) {
        this.objDoing = objDoing;
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