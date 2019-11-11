package com.maroon.mixology.exchange.response;

import java.util.ArrayList;

public class ProfileResponse {
    private String nickname;
    private String profilePic;
    private String name;
    private ArrayList<UserBarResponse> bars;
    private ArrayList<UserRecipeResponse> recipes;

    public ProfileResponse(String nickname, String profilePic, String name, ArrayList<UserBarResponse> bars,
            ArrayList<UserRecipeResponse> recipes) {
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

    public ArrayList<UserBarResponse> getBars() {
        return bars;
    }

    public void setBars(ArrayList<UserBarResponse> bars) {
        this.bars = bars;
    }

    public ArrayList<UserRecipeResponse> getRecipes() {
        return recipes;
    }

    public void setRecipes(ArrayList<UserRecipeResponse> recipes) {
        this.recipes = recipes;
    }


}
