package com.maroon.mixology.entity;

import java.util.ArrayList;

import com.maroon.mixology.entity.type.ActionType;
import com.maroon.mixology.entity.type.EquipmentType;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "equipment")
public class Equipment {
    @Id
    private String id;
    @Indexed(unique = true, direction = IndexDirection.DESCENDING, dropDups = true)
    private String name;
    private String image;
    private EquipmentType type;
    private boolean published;
    private boolean filled;
    private ArrayList<ActionType> actionsDoTo;
    private ArrayList<ActionType> actionsDoing;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name){
        this.name = name;
    }


    public EquipmentType getType() {
        return type;
    }

    public void setType(EquipmentType type) {
        this.type = type;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public boolean isFilled() {
        return filled;
    }

    public void setFilled(boolean filled) {
        this.filled = filled;
    }

    public ArrayList<ActionType> getActionsDoTo() {
        return actionsDoTo;
    }

    public void setActionsDoTo(ArrayList<ActionType> actionsDoTo) {
        this.actionsDoTo = actionsDoTo;
    }
    
    public ArrayList<ActionType> getActionsDoing() {
        return actionsDoing;
    }

    public void setActionsDoing(ArrayList<ActionType> actionsDoing) {
        this.actionsDoing = actionsDoing;
    }

}