import { useAppAction } from "../storeHook";
import { signIn, signOut } from "./authActions";

//action
export const useSignIn = () => useAppAction(signIn);
export const useSignOut = () => useAppAction(signOut);
