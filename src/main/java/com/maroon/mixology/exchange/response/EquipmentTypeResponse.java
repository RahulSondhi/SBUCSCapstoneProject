package com.maroon.mixology.exchange.response;

import java.util.Set;

import com.maroon.mixology.entity.type.ActionType;
import com.maroon.mixology.entity.type.EquipmentTypeEnum;

public class EquipmentTypeResponse {
    //we don't give them the ID
    private String type;
    private Set<ActionType> actionsToDo;
    private Set<ActionType> actionsDoing;

    public EquipmentTypeResponse(String type, Set<ActionType> actionsToDo, Set<ActionType> actionsDoing) {
        this.type = type;
        this.actionsToDo = actionsToDo;
        this.actionsDoing = actionsDoing;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<ActionType> getActionsToDo() {
        return actionsToDo;
    }

    public void setActionsToDo(Set<ActionType> actionsToDo) {
        this.actionsToDo = actionsToDo;
    }

    public Set<ActionType> getActionsDoing() {
        return actionsDoing;
    }

    public void setActionsDoing(Set<ActionType> actionsDoing) {
        this.actionsDoing = actionsDoing;
    }


}