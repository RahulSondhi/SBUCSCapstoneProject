package com.maroon.mixology.entity;

import com.maroon.mixology.entity.User;

import java.util.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "confirmationToken")
public class ConfirmationToken {

    @Id
    private long tokenid;

    private String confirmationToken;

    private Date createdDate;

    private User user;

    public ConfirmationToken(User user) {
        this.user = user;
        createdDate = new Date();
        confirmationToken = UUID.randomUUID().toString();
    }

    // getters and setters
    public long getTokenId(){
        return tokenid;
    }

    public void setTokenId(long tokenid){
        this.tokenid = tokenid;
    }

    public String getConfirmationToken(){
        return confirmationToken;
    }

    public void setConfirmationToken(String confirmationToken){
        this.confirmationToken = confirmationToken;
    }

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }
}