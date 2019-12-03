package com.maroon.mixology.exchange.response;

import java.util.Set;

import com.maroon.mixology.entity.type.ActionType;
import com.maroon.mixology.entity.type.EquipmentTypeEnum;

public class EquipmentTypeResponse {
    //we don't give them the ID
    private EquipmentTypeEnum type;
    private Set<ActionType> actionsDoTo;
    private Set<ActionType> actionsDoing;

    public EquipmentTypeResponse(EquipmentTypeEnum type, Set<ActionType> actionsDoTo, Set<ActionType> actionsDoing) {
        this.type = type;
        this.actionsDoTo = actionsDoTo;
        this.actionsDoing = actionsDoing;
    }

    public EquipmentTypeEnum getType() {
        return type;
    }

    public void setType(EquipmentTypeEnum type) {
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