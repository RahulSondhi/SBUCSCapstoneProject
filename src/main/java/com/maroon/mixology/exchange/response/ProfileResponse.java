package com.maroon.mixology.exchange.response;

import java.util.ArrayList;

public class ProfileResponse {
    private String nickname;
    private String profilePic;
    private String name;
    private ArrayList<UserBarResponse> bars;
    private ArrayList<UserRecipeResponse> recipesWritten;
    private ArrayList<UserRecipeResponse> recipesIncompleted;
    private ArrayList<UserRecipeResponse> recipesCompleted;

    public ProfileResponse(String nickname, String profilePic, String name, ArrayList<UserBarResponse> bars, ArrayList<UserRecipeResponse> recipesWritten, ArrayList<UserRecipeResponse> recipesIncompleted, ArrayList<UserRecipeResponse> recipesCompleted) {
        this.nickname = nickname;
        this.profilePic = profilePic;
        this.name = name;
        this.bars = bars;
        this.recipesWritten = recipesWritten;
        this.recipesIncompleted = recipesIncompleted;
        this.recipesCompleted = recipesCompleted;
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

    public ArrayList<UserRecipeResponse> getRecipesWritten() {
        return recipesWritten;
    }

    public void setRecipesWritten(ArrayList<UserRecipeResponse> recipesWritten) {
        this.recipesWritten = recipesWritten;
    }

    public ArrayList<UserRecipeResponse> getRecipesIncompleted() {
        return recipesIncompleted;
    }

    public void setRecipesIncompleted(ArrayList<UserRecipeResponse> recipesIncompleted) {
        this.recipesIncompleted = recipesIncompleted;
    }

    public ArrayList<UserRecipeResponse> getRecipesCompleted() {
        return recipesCompleted;
    }

    public void setRecipesCompleted(ArrayList<UserRecipeResponse> recipesCompleted) {
        this.recipesCompleted = recipesCompleted;
    }




}
