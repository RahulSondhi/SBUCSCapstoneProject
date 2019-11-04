package com.maroon.mixology.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = "role")
public class Role {
    @Id
    private String id;
    @Indexed(unique = true)
    private String name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRole(){
        return name;
    }
    public void setRole(String name){
        this.name = name;
    }

}