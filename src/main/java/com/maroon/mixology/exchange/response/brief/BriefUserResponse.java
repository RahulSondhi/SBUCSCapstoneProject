package com.maroon.mixology.exchange.response.brief;

public class BriefUserResponse {
    //we do not save the id
    private String name;
    private String fullName;
    private String img;

    public BriefUserResponse(String name, String fullName, String img) {
        this.name = name;
        this.fullName = fullName;
        this.img = img;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

}