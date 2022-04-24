export const loginSuccess = (token) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: token
    }
}

export const registerSuccess = (token) => {
    return {
        type: "REGISTER_SUCCESS",
        payload: token
    }
}

export const logoutAction = () => {
    return {
        type: "LOGOUT",
    }
}