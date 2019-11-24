package com.maroon.mixology.exchange.request;

import java.util.Set;

import com.maroon.mixology.entity.type.ActionType;
import com.maroon.mixology.entity.EquipmentType;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class EquipmentRequest {
    @NotBlank
    @Size(min = 4, max = 32)
    private String name;

    private String img;

    @NotBlank
    private EquipmentType type;
    @NotBlank
    private Set<ActionType> actionsDoTo;
    @NotBlank
    private Set<ActionType> actionsDoing;

}
