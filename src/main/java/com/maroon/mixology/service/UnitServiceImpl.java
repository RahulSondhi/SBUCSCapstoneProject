package com.maroon.mixology.service;

import java.util.List;

import com.maroon.mixology.entity.Unit;
import com.maroon.mixology.repository.UnitRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnitServiceImpl implements UnitService {
    @Autowired
    private UnitRepository unitRepository;

    @Override
    public Unit findByName(String name) {
        return unitRepository.findByName(name);
    }

	@Override
	public List<Unit> findAll() {
        return unitRepository.findAll();
	}

}