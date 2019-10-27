package com.maroon.mixology.exchange.response;

public class UserSummary {
    private String id;
    private String nickname;
    private String name;

    public UserSummary(String id, String nickname, String name) {
        this.id = id;
        this.nickname = nickname;
        this.name = name;
    }

    /**
     * @return String return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return String return the nickname
     */
    public String getNickname() {
        return nickname;
    }

    /**
     * @param nickname the nickname to set
     */
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}