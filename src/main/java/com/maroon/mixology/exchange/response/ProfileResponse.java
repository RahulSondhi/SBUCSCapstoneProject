package com.maroon.mixology.exchange.response;

import java.util.ArrayList;

public class ProfileResponse {
    private String nickname;
    private String profilePic;
    private String name;
    private ArrayList<BarResponse> bars;
    private ArrayList<RecipeResponse> recipes;

    public ProfileResponse(String nickname, String profilePic, String name, ArrayList<BarResponse> bars,
            ArrayList<RecipeResponse> recipes) {
        this.nickname = nickname;
        this.profilePic = profilePic;
        this.name = name;
        this.bars = bars;
        this.recipes = recipes;
    }


    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArrayList<BarResponse> getBars() {
        return bars;
    }

    public void setBars(ArrayList<BarResponse> bars) {
        this.bars = bars;
    }

    public ArrayList<RecipeResponse> getRecipes() {
        return recipes;
    }

    public void setRecipes(ArrayList<RecipeResponse> recipes) {
        this.recipes = recipes;
    }

}
