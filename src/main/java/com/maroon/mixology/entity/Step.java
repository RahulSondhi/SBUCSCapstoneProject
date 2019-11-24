package com.maroon.mixology.entity;

import com.maroon.mixology.entity.type.ActionType;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "step")
public class Step {
    @Id
    private String id;
    private String equipmentToDo; //name
    private String equipmentDoing; //name
    private String equipmentProduct; //name
    private ActionType action;
    private int value;
    @DBRef
    private Unit unit;

    public Step(String equipmentToDo, String equipmentDoing, String equipmentProduct, ActionType action, int value,
            Unit unit) {
        this.equipmentToDo = equipmentToDo;
        this.equipmentDoing = equipmentDoing;
        this.equipmentProduct = equipmentProduct;
        this.action = action;
        this.value = value;
        this.unit = unit;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }


}