package com.maroon.mixology.exchange.response;

public class UserSummary {
    private String id;
    private String email;
    private String nickname;

    public UserSummary(String id, String email, String nickname) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

}