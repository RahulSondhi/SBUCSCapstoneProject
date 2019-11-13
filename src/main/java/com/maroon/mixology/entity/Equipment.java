package com.maroon.mixology.entity;

import java.util.Set;

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
    private Set<ActionType> actionsDoTo;
    private Set<ActionType> actionsDoing;

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

    public Set<ActionType> getActionsDoTo() {
        return actionsDoTo;
    }

    public void setActionsDoTo(Set<ActionType> actionsDoTo) {
        this.actionsDoTo = actionsDoTo;
    }

    public Set<ActionType> getActionsDoing() {
        return actionsDoing;
    }

    public void setActionsDoing(Set<ActionType> actionsDoing) {
        this.actionsDoing = actionsDoing;
    }



}