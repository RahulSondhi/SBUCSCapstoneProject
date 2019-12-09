package com.maroon.mixology.entity;

import java.util.Set;

import com.maroon.mixology.entity.type.MeasurementType;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class User {
	@Id
	private String id;
	private String firstName;
	private String lastName;
	@Indexed(unique = true, direction = IndexDirection.DESCENDING, dropDups = true)
	private String email;
	@Indexed(unique = true, direction = IndexDirection.DESCENDING, dropDups = true)
	private String nickname;
	private String password;
	private String profilePic;
	private MeasurementType measurement;
	private String confirmationTokenUUID;
	private Long confirmationTokenCreationTime;
	private String resetTokenUUID;
	private Long resetTokenCreationTime;
	private boolean enabled;
	@DBRef
	private Set<Role> roles;

	public User(String firstName, String lastName, String email, String nickname, String password) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.nickname = nickname;
		this.password = password;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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
	
	public String getNickname(){
		return nickname;	
	}

	public void setNickname(String nickname){
		this.nickname = nickname;
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

    public String getConfirmationTokenUUID() {
        return confirmationTokenUUID;
    }

    public void setConfirmationTokenUUID(String confirmationTokenUUID) {
        this.confirmationTokenUUID = confirmationTokenUUID;
	}
	
    public Long getConfirmationTokenCreationTime() {
        return confirmationTokenCreationTime;
    }

    public void setConfirmationTokenCreationTime(Long confirmationTokenCreationTime) {
        this.confirmationTokenCreationTime = confirmationTokenCreationTime;
    }

    public String getResetTokenUUID() {
        return resetTokenUUID;
    }

    public void setResetTokenUUID(String resetTokenUUID) {
        this.resetTokenUUID = resetTokenUUID;
    }

    public Long getResetTokenCreationTime() {
        return resetTokenCreationTime;
    }

    public void setResetTokenCreationTime(Long resetTokenCreationTime) {
        this.resetTokenCreationTime = resetTokenCreationTime;
    }

	public boolean isEnabled() {
        return enabled;
    }

	public void setEnabled(boolean enabled){
		this.enabled = enabled;
	}
	public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
	}
	

}