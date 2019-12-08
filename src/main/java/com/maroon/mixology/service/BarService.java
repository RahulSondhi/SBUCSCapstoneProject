package com.maroon.mixology.service;

import java.util.List;

import com.maroon.mixology.entity.Bar;
import com.maroon.mixology.repository.BarRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BarService {
    @Autowired
    private BarRepository barRepository;

    /* Our custom method to overrule Optional*/
    public Bar findById(String id) {
        if(barRepository.findById(id).isEmpty()){
            return null;
        }
        return barRepository.findById(id).get();
    }

    public Bar findByName(String name) {
        return barRepository.findByName(name);
    }

    public List<Bar> findByNameLikeIgnoreCase(String name) {
        return barRepository.findByNameLikeIgnoreCase(name);
    }


}