package com.maroon.mixology.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = "unit")
public class Unit {
    @Id
    private String id;
    @Indexed(unique = true, direction = IndexDirection.DESCENDING, dropDups = true)
    private String name;
    private double mlMeasurement;
    private double flozMeasurement;

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

    public void setFlozMeasurement(double flozMeasurement) {
        this.flozMeasurement = flozMeasurement;
    }

    public void setMlMeasurement(double mlMeasurement) {
        this.mlMeasurement = mlMeasurement;
    }

    public double getMlMeasurement() {
        return mlMeasurement;
    }

    public double getFlozMeasurement() {
        return flozMeasurement;
    }
}