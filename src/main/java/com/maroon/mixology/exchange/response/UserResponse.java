package com.maroon.mixology.exchange.response;

import java.util.Set;

import com.maroon.mixology.exchange.response.brief.BriefBarResponse;
import com.maroon.mixology.exchange.response.brief.BriefRecipeResponse;

public class UserResponse {
    private String nickname;
    private String img;
    private String name;
    private Set<BriefBarResponse> bars;
    private Set<BriefRecipeResponse> recipesWritten;
    private Set<BriefRecipeResponse> recipesIncompleted;
    private Set<BriefRecipeResponse> recipesCompleted;

    public UserResponse(String nickname, String img, String name, Set<BriefBarResponse> bars,
            Set<BriefRecipeResponse> recipesWritten, Set<BriefRecipeResponse> recipesIncompleted,
            Set<BriefRecipeResponse> recipesCompleted) {
        this.nickname = nickname;
        this.img = img;
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

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<BriefBarResponse> getBars() {
        return bars;
    }

    public void setBars(Set<BriefBarResponse> bars) {
        this.bars = bars;
    }

    public Set<BriefRecipeResponse> getRecipesWritten() {
        return recipesWritten;
    }

    public void setRecipesWritten(Set<BriefRecipeResponse> recipesWritten) {
        this.recipesWritten = recipesWritten;
    }

    public Set<BriefRecipeResponse> getRecipesIncompleted() {
        return recipesIncompleted;
    }

    public void setRecipesIncompleted(Set<BriefRecipeResponse> recipesIncompleted) {
        this.recipesIncompleted = recipesIncompleted;
    }

    public Set<BriefRecipeResponse> getRecipesCompleted() {
        return recipesCompleted;
    }

    public void setRecipesCompleted(Set<BriefRecipeResponse> recipesCompleted) {
        this.recipesCompleted = recipesCompleted;
    }


}
