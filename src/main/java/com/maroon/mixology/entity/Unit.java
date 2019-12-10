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
    private String type;
    private double usMeasurement;
    private double metricMeasurement;

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

    public double getUsMeasurement() {
        return usMeasurement;
    }

    public void setUsMeasurement(double usMeasurement) {
        this.usMeasurement = usMeasurement;
    }

    public double getMetricMeasurement() {
        return metricMeasurement;
    }

    public void setMetricMeasurement(double metricMeasurement) {
        this.metricMeasurement = metricMeasurement;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
}