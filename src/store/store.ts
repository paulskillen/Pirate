// third-party
import { applyMiddleware, compose, createStore } from "redux";
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

export const store = createStore(
    rootReducer,
    load(),
    compose()
    // applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const makeStore: MakeStore<any> = () => store;

export const wrapper = createWrapper<any>(makeStore);
