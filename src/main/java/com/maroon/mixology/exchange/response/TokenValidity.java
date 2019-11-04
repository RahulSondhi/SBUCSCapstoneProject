package com.maroon.mixology.exchange.response;

public class TokenValidity {
    private Boolean valid;
    private String message;
    
    public TokenValidity(Boolean valid, String message) {
        this.valid = valid;
        this.message = message;
    }  

    /**
     * @return Boolean return the valid
     */
    public Boolean isValid() {
        return valid;
    }

    /**
     * @param valid the valid to set
     */
    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    /**
     * @return String return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

}
