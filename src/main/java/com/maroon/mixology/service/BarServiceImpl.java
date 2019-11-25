package com.maroon.mixology.service;

import java.util.List;
import java.util.NoSuchElementException;

import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.repository.BarRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BarServiceImpl implements BarService {
    @Autowired
    private BarRepository barRepository;

    @Override
    /* Our custom method to overrule Optional*/
    public Bar findById(String id) throws NoSuchElementException {
        return barRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Student not found - " + id));
    }

    @Override
    public Bar findByName(String name) {
        return barRepository.findByName(name);
    }

    @Override
    public List<Bar> findByNameLikeIgnoreCase(String name) {
        // TODO Auto-generated method stub
        return barRepository.findByNameLikeIgnoreCase(name);
    }


}