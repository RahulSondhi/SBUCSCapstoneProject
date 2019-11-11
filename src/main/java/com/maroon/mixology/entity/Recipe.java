package com.maroon.mixology.entity;

import java.util.ArrayList;
import java.util.Set;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recipe")
public class Recipe{
    @Id
    private String id;
    private String name;
    private String image;
    @DBRef
    private User author;
    private boolean published;
    private ArrayList<Step> steps;
    @DBRef
    private Set<Equipment> equipments;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public User getAuthor(){
        return author;
    }

    public void setAuthor(User author){
        this.author = author;
    }

    public boolean getPublished(){
        return published;
    }

    public void setPublished(boolean published){
        this.published = published;
    }

    public ArrayList<Step> getSteps(){
        return steps;
    }

    public void setSteps(ArrayList<Step> steps){
        this.steps = steps;
    }

    public Set<Equipment> getEquipments(){
        return equipments;
    }

    public void setEquipments(Set<Equipment> equipments) {
        this.equipments = equipments;
    }

}