package com.maroon.mixology;

// import java.util.Base64;
// import java.math.BigInteger;

import org.springframework.stereotype.Component;

@Component //Needed for Autowired
public class Helper{

    /* DEPRECATED FUNCTIONS FOR NOW. I will find a use for them some other way */
    // public static String encodeHexToBase64(String hex){
    //     return Base64.getEncoder().encodeToString(new BigInteger(hex, 16).toByteArray());
    // }

    // public static String decodeBase64ToHex(String base64){
    //     return String.format("%x", new BigInteger(1, Base64.getDecoder().decode(base64)));
    // }
}