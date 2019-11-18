package com.maroon.mixology.exchange.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class RecipeRequest {
    @NotBlank
    @Size(min = 4, max = 32)
    private String name;
    //owner is handled by the current user
    private String image;

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


}
