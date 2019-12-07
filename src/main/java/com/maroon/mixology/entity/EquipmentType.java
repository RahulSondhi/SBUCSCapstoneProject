package com.maroon.mixology.entity;

import java.util.Set;

import com.maroon.mixology.entity.type.ActionType;
import com.maroon.mixology.entity.type.EquipmentTypeEnum;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "type")
public class EquipmentType {
    @Id
    private String id;
	@Indexed(unique = true, direction = IndexDirection.DESCENDING, dropDups = true)
    private String name;
    private Set<ActionType> actionsToDo;
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

    public void setName(String name) {
        this.name = name;
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