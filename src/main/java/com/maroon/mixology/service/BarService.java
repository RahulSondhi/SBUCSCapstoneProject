package com.maroon.mixology.service;

import java.util.List;
import java.util.NoSuchElementException;

import com.maroon.mixology.entity.Bar;

public interface BarService{

    Bar findById(String id) throws NoSuchElementException;
    
    Bar findByName(String name);

    List<Bar> findByNameLikeIgnoreCase(String name);

}