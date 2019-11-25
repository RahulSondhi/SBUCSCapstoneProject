package com.maroon.mixology.service;

import java.util.List;

import com.maroon.mixology.entity.Unit;

public interface UnitService{
    
    Unit findByName(String name);

    List<Unit> findAll();
}