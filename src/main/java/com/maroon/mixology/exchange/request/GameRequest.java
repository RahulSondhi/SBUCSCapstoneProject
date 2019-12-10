package com.maroon.mixology.exchange.request;

import java.util.ArrayList;

public class GameRequest {
    //player is handled by currentUser
    private ArrayList<Integer> progress;
    private boolean completed;

    public ArrayList<Integer> getProgress() {
        return progress;
    }

    public void setProgress(ArrayList<Integer> progress) {
        this.progress = progress;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}