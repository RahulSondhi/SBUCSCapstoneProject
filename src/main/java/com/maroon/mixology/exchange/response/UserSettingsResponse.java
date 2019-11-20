package com.maroon.mixology.exchange.response;

import com.maroon.mixology.entity.type.MeasurementType;

public class UserSettingsResponse {
    private String firstName;
    private String lastName;
    private String email;
    private String img;
    private MeasurementType measurement;

    public UserSettingsResponse(String firstName, String lastName, String email, String img,
            MeasurementType measurement) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.img = img;
        this.measurement = measurement;
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public MeasurementType getMeasurement() {
        return measurement;
    }

    public void setMeasurement(MeasurementType measurement) {
        this.measurement = measurement;
    }


}
