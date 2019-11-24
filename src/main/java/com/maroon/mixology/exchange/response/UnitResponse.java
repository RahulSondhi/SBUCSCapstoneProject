package com.maroon.mixology.exchange.response;

public class UnitResponse {
    private String name;
    private double usMeasurement;
    private double metricMeasurement;

    public UnitResponse(String name, double usMeasurement, double metricMeasurement) {
        this.name = name;
        this.usMeasurement = usMeasurement;
        this.metricMeasurement = metricMeasurement;
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


}