package com.maroon.mixology.exchange.response;

public class UserRecipeResponse {
    private String id;
    private String name;
    private String img;
    private String author;

    public UserRecipeResponse(String id, String name, String img, String author) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.author = author;
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }


}