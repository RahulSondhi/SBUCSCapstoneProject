package com.maroon.mixology.exchange.response.brief;

public class BriefUserResponse {
    //we do not save the id
    private String nickname;
    private String name;
    private String img;

    public BriefUserResponse(String nickname, String name, String img) {
        this.nickname = nickname;
        this.name = name;
        this.img = img;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
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


}