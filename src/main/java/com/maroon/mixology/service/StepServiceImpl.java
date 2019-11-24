package com.maroon.mixology.service;

import java.util.NoSuchElementException;

import com.maroon.mixology.entity.Step;
import com.maroon.mixology.repository.StepRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StepServiceImpl implements StepService {
    @Autowired
    private StepRepository stepRepository;

    @Override
    /* Our custom method to overrule Optional*/
    public Step findById(String id) throws NoSuchElementException {
        return stepRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Step not found - " + id));
    }


}