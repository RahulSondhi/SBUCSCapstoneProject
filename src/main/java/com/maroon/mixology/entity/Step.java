package com.maroon.mixology.entity;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "step")
public class Step{    
    private int stepNumber;
    private Equipment equipment1;
    private Equipment equipment2;
    private String action;
    private boolean complete;

    public int getStepNumber(){
        return stepNumber;
    }

    public void setStepNumber(int stepNumber){
        this.stepNumber = stepNumber;
    }

    public Equipment getEquipment1(){
        return equipment1;
    }

    public void setEquipment1(Equipment equipment1){
        this.equipment1 = equipment1;
    }
    
    public Equipment getEquipment22(){
        return equipment2;
    }

    public void setEquipment2(Equipment equipment2){
        this.equipment2 = equipment2;
    }

    public String getAction(){
        return action;
    }

    public void setAction(String action){
        this.action = action;
    }

    public boolean getComplete(){
        return complete;
    }

    public void setComplete(boolean complete){
        this.complete = complete;
    }
}