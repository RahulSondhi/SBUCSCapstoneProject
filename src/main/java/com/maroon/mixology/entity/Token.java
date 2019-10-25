package com.maroon.mixology.entity;

import java.util.Calendar;
import java.util.UUID;

public class Token {
    private String uuid;
    private Calendar creationTime;

    public Token(){
        this.uuid = UUID.randomUUID().toString();
        Calendar date = Calendar.getInstance(); //get the current time
        this.creationTime = date;
    }
    public String getUUID(){
        return uuid;
    }

    public void setUUID(String uuid){
        this.uuid = uuid;
    }
    
    public Calendar getCreationDate(){
        return creationTime;
    }

    public void setCreationDate(Calendar creationTime){
        this.creationTime = creationTime;
    }

}