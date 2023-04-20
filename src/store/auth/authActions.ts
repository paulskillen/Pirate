import {
    AUTH_SIGN_OUT,
    AUTH_SIGN_IN,
    AUTH_SAVE_REGISTER,
} from "./authActionTypes";

export function signInAction(accessToken: string) {
    return {
        type: AUTH_SIGN_IN,
        data: accessToken,
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
