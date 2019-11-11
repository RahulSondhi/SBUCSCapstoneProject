package com.maroon.mixology.exchange.response;

import com.maroon.mixology.Helper;

public class UserBarResponse {
    private String id; //save as base64
    private String name;
    private String img;
    private String owner;

    public UserBarResponse(String id, String name, String img, String owner) {
        this.id = Helper.encodeHexToBase64(id);
        this.name = name;
        this.img = img;
        this.owner = owner;
    }

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

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }



}