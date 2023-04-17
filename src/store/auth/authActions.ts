import {
    AUTH_SIGN_OUT,
    AUTH_SIGN_IN,
    AUTH_SAVE_REGISTER,
} from "./authActionTypes";

export function signIn(accessToken: string) {
    return {
        type: AUTH_SIGN_IN,
        data: accessToken,
    };
}

export function signOut() {
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
