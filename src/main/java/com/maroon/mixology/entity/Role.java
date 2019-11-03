package com.maroon.mixology.entity;

import com.maroon.mixology.entity.type.RoleType;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = "role")
public class Role {
    @Id
    private String id;
    @Indexed(unique = true)
    private RoleType name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public RoleType getRole(){
        return name;
    }
    public void setRole(RoleType name){
        this.name = name;
    }

}