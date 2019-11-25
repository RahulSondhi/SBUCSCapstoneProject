package com.maroon.mixology.exchange.response.brief;

public class BriefBarResponse {
    private String id;
    private String name;
    private String img;
    private String owner;

    public BriefBarResponse(String id, String name, String img, String owner) {
        this.id = id;
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