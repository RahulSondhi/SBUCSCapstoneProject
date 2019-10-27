import { ACCESS_TOKEN, API_BASE_URL } from '../constants/constants.js'

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({url: API_BASE_URL + "/user/me",method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function register(registerRequest) {
    return request({
        url: API_BASE_URL + "/register",
        method: 'POST',
        body: JSON.stringify(registerRequest)
    });
}

export function forgot(forgotRequest) {
    return request({
        url: API_BASE_URL + "/forgot",
        method: 'POST',
        body: JSON.stringify(forgotRequest)
    });
}

export function resetPassword(resetPasswordRequest) {
    return request({
        url: API_BASE_URL + "/resetPassword",
        method: 'POST',
        body: JSON.stringify(resetPasswordRequest)
    });
}

export function validateReset(uuid) {
    return request({
        url: API_BASE_URL + "/validateReset?token=" + uuid,
        method: 'GET'
    });
}

export function checkNicknameAvailability(nickname) {
    return request({
        url: API_BASE_URL + "/user/checkNicknameAvailability?nickname=" + nickname,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

