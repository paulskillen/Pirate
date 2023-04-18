// third-party
import { applyMiddleware, compose, createStore } from "redux";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import { MakeStore, createWrapper } from "next-redux-wrapper";
// reducer
import rootReducer from "./root/rootReducer";
import version from "./version";

export const APP_STORE = "APP_STORE";

export function load() {
    if (!process.browser) {
        return undefined;
    }

    let state;

    try {
        state = localStorage.getItem(APP_STORE);

        if (typeof state === "string") {
            state = JSON.parse(state);
        }

        if (state && state.version !== version) {
            state = undefined;
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    return state || undefined;
}

export const save = (state: any) => {
    try {
        localStorage.setItem(APP_STORE, JSON.stringify(state));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

export const store = configureStore({ reducer: rootReducer, devTools: true });

const makeStore: MakeStore<any> = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore);