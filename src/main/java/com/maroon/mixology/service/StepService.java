package com.maroon.mixology.service;

import java.util.NoSuchElementException;

import com.maroon.mixology.entity.Step;

public interface StepService{

    Step findById(String id) throws NoSuchElementException;
    

}