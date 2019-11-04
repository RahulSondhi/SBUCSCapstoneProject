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
    private ActionType action;
    private int value;
    @DBRef
    private Unit unit;
    private boolean completed;

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

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

}