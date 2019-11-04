package com.maroon.mixology.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = "unit")
public class Unit {
    @Id
    private String id;
    @Indexed() //Is this necessary?
    private String name;
    private int mlMeasurement;
    private int flozMeasurement;

    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
    }
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

    public void setFlozMeasurement(int flozMeasurement) {
        this.flozMeasurement = flozMeasurement;
    }

    public void setMlMeasurement(int mlMeasurement) {
        this.mlMeasurement = mlMeasurement;
    }

    public int getMlMeasurement() {
        return mlMeasurement;
    }

    public int getFlozMeasurement() {
        return flozMeasurement;
    }
}