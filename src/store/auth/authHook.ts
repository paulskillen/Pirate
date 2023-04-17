import { useAppAction, useAppSelector } from "../hook";
import { signIn, signOut } from "./authActions";
import { AuthState, AUTH_NAMESPACE } from "./authReducer";

//action
export const useSignIn = () => useAppAction(signIn);
export const useSignOut = () => useAppAction(signOut);

//state
export const useAuthRegister = (): AuthState["registerData"] =>
    useAppSelector((state) => {
        console.log(
            "🚀 >>>>>> file: authHook.ts:13 >>>>>> useAppSelector >>>>>> state:",
            state
        );
        return state?.[AUTH_NAMESPACE]?.registerData;
    }) as any;
