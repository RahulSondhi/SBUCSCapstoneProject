package com.maroon.mixology.exchange.response;

import java.util.ArrayList;

import com.maroon.mixology.exchange.response.brief.BriefUserResponse;

public class StatResponse {
    private BriefUserResponse player;
    private ArrayList<Integer> progress;
    private boolean completed;

    public StatResponse(BriefUserResponse player, ArrayList<Integer> progress, boolean completed) {
        this.player = player;
        this.progress = progress;
        this.completed = completed;
    }

    public BriefUserResponse getPlayer() {
        return player;
    }

    public void setPlayer(BriefUserResponse player) {
        this.player = player;
    }

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