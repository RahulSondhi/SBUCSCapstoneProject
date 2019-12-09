import { ACCESS_TOKEN, API_BASE_URL } from './constants'

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
                const rejection = {
                    status: response.status,
                    message: json
                };
                return Promise.reject(rejection);
            }
            return json;
        })
    );
};


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

export function verifyReset(uuid) {
    return request({
        url: API_BASE_URL + "/verifyReset?token=" + uuid,
        method: 'GET'
    });
}

export function verifyConfirm(uuid) {
    return request({
        url: API_BASE_URL + "/verifyConfirm?token=" + uuid,
        method: 'GET'
    });
}

export function verifyNewEmail(uuid, email) {
    return request({
        url: API_BASE_URL + "/tipsy/user/verifyNewEmail?token=" + uuid + "&email=" + email,
        method: 'GET'
    });
}

export function checkNicknameAvailability(nickname) {
    return request({
        url: API_BASE_URL + "/tipsy/user/checkNicknameAvailability?nickname=" + nickname,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/tipsy/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function checkEquipmentNameIsPresent(equipmentName) {
    return request({
        url: API_BASE_URL + "/tipsy/equipment/checkEquipmentNameIsPresent?equipmentName=" + equipmentName,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({url: API_BASE_URL + "/tipsy/user/currentUser", method: 'GET'
    });
}

export function getBarProfile(barID) {
    return request({
        url: API_BASE_URL + "/tipsy/bar/" + barID,
        method: 'GET'
    });
}

export function createBar(barRequest) {
    return request({
        url: API_BASE_URL + "/tipsy/bar/createBar",
        method: 'POST',
        body: JSON.stringify(barRequest)
    });
}

export function changeBarSettings(barID, barRequest) {
    return request({
        url: API_BASE_URL + "/tipsy/bar/" + barID + "/changeSettings" ,
        method: 'POST',
        body: JSON.stringify(barRequest)
    });
}

export function deleteBar(barID) {
    return request({
        url: API_BASE_URL + "/tipsy/bar/" + barID + "/delete" ,
        method: 'POST',
        body: JSON.stringify(null)
    });
}

export function getEquipmentProfile(equipmentName) {
    return request({
        url: API_BASE_URL + "/tipsy/equipment/" + equipmentName,
        method: 'GET'
    });
}

export function getAllEquipment() {
    return request({
        url: API_BASE_URL + "/tipsy/equipment/getEquipments",
        method: 'GET'
    });
}

export function getAllEquipmentTypes() {
    return request({
        url: API_BASE_URL + "/tipsy/equipment/getEquipmentTypes",
        method: 'GET'
    });
}

export function getAllUnits() {
    return request({
        url: API_BASE_URL + "/tipsy/unit/getUnits",
        method: 'GET'
    });
}

export function getUserProfile(nickname) {
    return request({
        url: API_BASE_URL + "/tipsy/user/" + nickname,
        method: 'GET'
    });
}

export function getUserSettings(nickname) {
    return request({
        url: API_BASE_URL + "/tipsy/user/" + nickname + "/getSettings",
        method: 'GET',
    });
}

export function changeUserSettings(settingsRequest,nickname) {
    return request({
        url: API_BASE_URL + "/tipsy/user/"+nickname+"/changeSettings",
        method: 'POST',
        body: JSON.stringify(settingsRequest)
    });
}

export function changePassword(changePasswordRequest) {
    return request({
        url: API_BASE_URL + "/tipsy/user/changePassword",
        method: 'POST',
        body: JSON.stringify(changePasswordRequest)
    });
}

export function getRecipeProfile(recipeID) {
    return request({
        url: API_BASE_URL + "/tipsy/recipe/" + recipeID,
        method: 'GET'
    });
}

export function createRecipe(recipeRequest) {
    return request({
        url: API_BASE_URL + "/tipsy/recipe/createRecipe",
        method: 'POST',
        body: JSON.stringify(recipeRequest)
    });
}

export function changeRecipeSettings(recipeID, recipeRequest) {
    return request({
        url: API_BASE_URL + "/tipsy/recipe/" + recipeID + "/changeSettings" ,
        method: 'POST',
        body: JSON.stringify(recipeRequest)
    });
}

export function deleteRecipe(recipeID) {
    return request({
        url: API_BASE_URL + "/tipsy/recipe/" + recipeID + "/delete" ,
        method: 'POST',
        body: JSON.stringify(null)
    });
}

export function initGame(recipeID){
    return request({
        url: API_BASE_URL + "/tipsy/recipe/" + recipeID + "/play" ,
        method: 'POST',
        body: JSON.stringify(null)
    });
}

export function search(type, query) {
    return request({
        url: API_BASE_URL + "/tipsy/search?type=" + type + "&query=" + query,
        method: 'GET'
    });
}

export function getUserBrief(nickname) {
    return request({
        url: API_BASE_URL + "/tipsy/search/user/getBrief?nickname=" + nickname,
        method: 'GET'
    });
}

export function getBarBrief(barID) {
    return request({
        url: API_BASE_URL + "/tipsy/search/bar/getBrief?barID=" + barID,
        method: 'GET'
    });
}

export function getRecipeBrief(recipeID) {
    return request({
        url: API_BASE_URL + "/tipsy/search/recipe/getBrief?recipeID=" + recipeID,
        method: 'GET'
    });
}

export function getEquipmentBrief(name) {
    return request({
        url: API_BASE_URL + "/tipsy/search/equipment/getBrief?name=" + name,
        method: 'GET'
    });
}
