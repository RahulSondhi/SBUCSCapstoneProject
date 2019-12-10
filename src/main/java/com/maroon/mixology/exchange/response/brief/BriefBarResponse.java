package com.maroon.mixology.exchange.response.brief;

import java.util.Set;

public class BriefBarResponse {
    private String id;
    private String name;
    private String img;
    private String owner;
    private Set<String> managers;
    private Set<String> workers;

    public BriefBarResponse(String id, String name, String img, String owner, Set<String> managers, Set<String> workers) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.owner = owner;
        this.managers = managers;
        this.workers = workers;
    }

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

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getOwner() {
        return owner;
    }

    public void setManagers(Set<String> managers) {
        this.managers = managers;
    }

    public Set<String> getManagers() {
        return managers;
    }

    public void setWorkers(Set<String> workers) {
        this.workers = workers;
    }

    public Set<String> getWorkers() {
        return workers;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

}