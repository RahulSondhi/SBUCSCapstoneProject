package com.maroon.mixology.entity;

import java.util.ArrayList;
import java.util.Set;

import com.maroon.mixology.exchange.response.EquipmentProductResponse;
import com.maroon.mixology.exchange.response.EquipmentResponse;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recipe")
public class Recipe {
    @Id
    private String id;
    private String name;
    private String description;
    private String image;
    @DBRef
    private User author;
    private boolean published;
    @DBRef
    private ArrayList<Step> steps;
    private Set<EquipmentResponse> equipmentsAvailable;
    private Set<EquipmentProductResponse> equipmentProducts;

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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public ArrayList<Step> getSteps() {
        return steps;
    }

    public void setSteps(ArrayList<Step> steps) {
        this.steps = steps;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<EquipmentResponse> getEquipmentsAvailable() {
        return equipmentsAvailable;
    }

    public void setEquipmentsAvailable(Set<EquipmentResponse> equipmentsAvailable) {
        this.equipmentsAvailable = equipmentsAvailable;
    }

    public Set<EquipmentProductResponse> getEquipmentProducts() {
        return equipmentProducts;
    }

    public void setEquipmentProducts(Set<EquipmentProductResponse> equipmentProducts) {
        this.equipmentProducts = equipmentProducts;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
        public boolean equals(Object object) {
            if (!(object instanceof Recipe)) {
                return false;
            }
            Recipe other = (Recipe) object;
            if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
                return false;
            }
            return true;
        }


}