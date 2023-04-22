import { useAppAction, useAppSelector } from "../hook";
import { signInAction, signOutAction } from "./authActions";
import { AuthState, AUTH_NAMESPACE } from "./authReducer";

//action
export const useSignIn = () => useAppAction(signInAction);
export const useSignOut = () => useAppAction(signOutAction);

//state
export const useAuthRegister = (): AuthState["registerData"] =>
    useAppSelector((state) => {
        return state?.[AUTH_NAMESPACE]?.registerData;
    }) as any;

export const useAuthAccessToken = (): AuthState["accessToken"] =>
    useAppSelector((state) => {
        return state?.[AUTH_NAMESPACE]?.accessToken;
    }) as any;

export const useAuthProfile = (): AuthState["profile"] =>
    useAppSelector((state) => {
        return state?.[AUTH_NAMESPACE]?.profile;
    }) as any;
