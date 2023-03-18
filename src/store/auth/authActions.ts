import { AUTH_SIGN_OUT, AUTH_SIGN_IN } from "./authActionTypes";

export function signIn(accessToken: string) {
    return {
        type: AUTH_SIGN_IN,
        accessToken,
    };
}

export function signOut() {
    return {
        type: AUTH_SIGN_OUT,
    };
}
