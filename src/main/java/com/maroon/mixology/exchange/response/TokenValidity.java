package com.maroon.mixology.exchange.response;

public class TokenValidity {
    private Boolean valid;

    public TokenValidity(Boolean valid) {
        this.valid = valid;
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

}
