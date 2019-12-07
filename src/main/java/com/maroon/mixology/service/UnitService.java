package com.maroon.mixology.service;

import java.util.List;

import com.maroon.mixology.entity.Unit;
import com.maroon.mixology.repository.UnitRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnitService {
    @Autowired
    private UnitRepository unitRepository;

    public Unit findByName(String name) {
        return unitRepository.findByName(name);
    }

    public List<Unit> findAll() {
        return unitRepository.findAll();
	}

}