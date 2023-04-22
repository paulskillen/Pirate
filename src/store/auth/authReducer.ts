import { ICustomer } from "@/common/interface/customer";
import { withClientState } from "../client";
import {
    AUTH_SAVE_REGISTER,
    AUTH_SIGN_IN,
    AUTH_SIGN_OUT,
} from "./authActionTypes";

export const AUTH_NAMESPACE = "auth";

export interface AuthState {
    accessToken: string | null;
    profile: ICustomer | null;
    registerData?: Partial<ICustomer> | null;
}

const initialState: AuthState = {
    accessToken: null,
    profile: null,
    registerData: null,
};

const resetUserInfo = () => initialState;

function authBaseReducer(state = initialState, action: any) {
    switch (action.type) {
        case AUTH_SIGN_IN:
            return {
                ...state,
                ...(action?.data ?? {}),
            };
        case AUTH_SIGN_OUT:
            return resetUserInfo();
        case AUTH_SAVE_REGISTER:
            return {
                ...state,
                registerData: action?.data,
            };
        default:
            return state;
    }
}

const authReducer = withClientState(authBaseReducer, AUTH_NAMESPACE);

export default authReducer;
