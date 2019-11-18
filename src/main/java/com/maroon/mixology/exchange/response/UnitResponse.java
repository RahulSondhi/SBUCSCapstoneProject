package com.maroon.mixology.exchange.response;

public class UnitResponse {
    private String name;
    private double mlMeasurement;
    private double flOzMeasurements;

    public UnitResponse(String name, double mlMeasurement, double flOzMeasurements) {
        this.name = name;
        this.mlMeasurement = mlMeasurement;
        this.flOzMeasurements = flOzMeasurements;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getMlMeasurement() {
        return mlMeasurement;
    }

    public void setMlMeasurement(double mlMeasurement) {
        this.mlMeasurement = mlMeasurement;
    }

    public double getFlOzMeasurements() {
        return flOzMeasurements;
    }

    public void setFlOzMeasurements(double flOzMeasurements) {
        this.flOzMeasurements = flOzMeasurements;
    }
    
}