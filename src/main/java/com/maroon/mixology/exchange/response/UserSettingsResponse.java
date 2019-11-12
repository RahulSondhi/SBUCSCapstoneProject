package com.maroon.mixology.exchange.response;

import com.maroon.mixology.entity.type.MeasurementType;

public class UserSettingsResponse {
    private String firstName;
    private String lastName;
    private String email;
    private String profilePic;
    private MeasurementType measurement;

    public UserSettingsResponse(String firstName, String lastName, String email, String profilePic,
            MeasurementType measurement) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profilePic = profilePic;
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

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public MeasurementType getMeasurement() {
        return measurement;
    }

    public void setMeasurement(MeasurementType measurement) {
        this.measurement = measurement;
    }


}
