package com.maroon.mixology.exchange.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.maroon.mixology.entity.type.MeasurementType;

public class SettingsRequest {
    @NotBlank
    @Size(min = 2, max = 50)
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 50)
    private String lastName;
    
    @NotBlank
    @Size(max = 62)
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 256)
    private String password;

    private String profilePic;

    @NotBlank
    private MeasurementType measurement;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
