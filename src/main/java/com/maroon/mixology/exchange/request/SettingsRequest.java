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


}
