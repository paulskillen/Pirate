import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from "./authActionTypes";
import { AccountState } from "./authType";

const initialState: AccountState = {
    accessToken: null,
};

const saveAccessToken = (state: AccountState, accessToken: string) => {
    return {
        ...state,
        accessToken,
    };
};

const resetUserInfo = () => initialState;

export default function authReducer(state = initialState, action: any) {
    switch (action.type) {
        case AUTH_SIGN_IN:
            return saveAccessToken(state, action.accessToken);
        case AUTH_SIGN_OUT:
            return resetUserInfo();
        default:
            return state;
    }
}
