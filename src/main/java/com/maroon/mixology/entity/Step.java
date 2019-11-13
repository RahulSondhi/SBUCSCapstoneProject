package com.maroon.mixology.entity;

import com.maroon.mixology.entity.type.ActionType;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "step")
public class Step {
    @Id
    private String id;
    @DBRef
    private Equipment objToDo;
    @DBRef
    private Equipment objDoing;
    private boolean customEquipmentTodo;
    private boolean customEquipmentDoing;
    private Equipment customObjToDo;
    private Equipment customObjDoing;
    private ActionType action;
    private int value;
    @DBRef
    private Unit unit;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Equipment getObjToDo() {
        return objToDo;
    }

    public void setObjToDo(Equipment objToDo) {
        this.objToDo = objToDo;
    }

    public Equipment getObjDoing() {
        return objDoing;
    }

    public void setObjDoing(Equipment objDoing) {
        this.objDoing = objDoing;
    }

    public Equipment getCustomObjDoing() {
        return customObjDoing;
    }

    public void setCustomObjDoing(Equipment customObjDoing) {
        this.customObjDoing = customObjDoing;
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

    public Equipment getCustomObjToDo() {
        return customObjToDo;
    }

    public void setCustomObjToDo(Equipment customObjToDo) {
        this.customObjToDo = customObjToDo;
    }

    public boolean isCustomEquipmentTodo() {
        return customEquipmentTodo;
    }

    public void setCustomEquipmentTodo(boolean customEquipmentTodo) {
        this.customEquipmentTodo = customEquipmentTodo;
    }

    public boolean isCustomEquipmentDoing() {
        return customEquipmentDoing;
    }

    public void setCustomEquipmentDoing(boolean customEquipmentDoing) {
        this.customEquipmentDoing = customEquipmentDoing;
    }



}