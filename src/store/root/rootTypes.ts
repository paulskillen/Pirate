import authBaseReducer from "../auth/authReducer";
import { AppReducerStateType } from "../types";

export interface RootState {
    version: number;
    auth: AppReducerStateType<typeof authBaseReducer>;
}
