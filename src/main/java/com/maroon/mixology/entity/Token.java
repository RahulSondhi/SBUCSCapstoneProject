package com.maroon.mixology.entity;

import java.time.LocalDate;
import java.util.UUID;

public class Token {
    private String uuid;
    private LocalDate creationTime;

    public Token(){
        this.uuid = UUID.randomUUID().toString();
        LocalDate date = LocalDate.now(); // gets the current date
        this.creationTime = date;
    }
    public String getUUID(){
        return uuid;
    }

    public void setUUID(String uuid){
        this.uuid = uuid;
    }
    
    public LocalDate getCreationDate(){
        return creationTime;
    }

    public void setCreationDate(LocalDate creationTime){
        this.creationTime = creationTime;
    }

}