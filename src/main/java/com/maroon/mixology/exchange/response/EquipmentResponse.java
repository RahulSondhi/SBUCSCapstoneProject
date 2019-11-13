package com.maroon.mixology.exchange.response;

import java.util.Set;

import com.maroon.mixology.entity.type.ActionType;
import com.maroon.mixology.entity.type.EquipmentType;

public class EquipmentResponse {
    //we don't give them the ID
    private String name;
    private String image;
    private EquipmentType type; // ENUM
    private Set<ActionType> actionsDoTo; // ENUM[]
    private Set<ActionType> actionsDoing; // ENUM[]

    public EquipmentResponse(String name, String image, EquipmentType type, Set<ActionType> actionsDoTo,
            Set<ActionType> actionsDoing) {
        this.name = name;
        this.image = image;
        this.type = type;
        this.actionsDoTo = actionsDoTo;
        this.actionsDoing = actionsDoing;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public EquipmentType getType() {
        return type;
    }

    public void setType(EquipmentType type) {
        this.type = type;
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