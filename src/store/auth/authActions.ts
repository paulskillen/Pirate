import {
    AUTH_SIGN_OUT,
    AUTH_SIGN_IN,
    AUTH_SAVE_REGISTER,
} from "./authActionTypes";

export function signInAction(data: any) {
    return {
        type: AUTH_SIGN_IN,
        data,
    };
}

export function signOutAction() {
    return {
        type: AUTH_SIGN_OUT,
    };
}

export function saveRegister(data: any) {
    return {
        type: AUTH_SAVE_REGISTER,
        data,
    };
}
