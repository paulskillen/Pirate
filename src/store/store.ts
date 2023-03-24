// third-party
import { applyMiddleware, compose, createStore } from "redux";
// import thunk from "redux-thunk";
// reducer
import rootReducer from "./root/rootReducer";
import version from "./version";

export const APP_STORE = "APP_STORE";

function load() {
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

const store = createStore(
    rootReducer,
    load(),
    compose()
    // applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function save() {
    try {
        localStorage.setItem(APP_STORE, JSON.stringify(store.getState()));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}

store.subscribe(() => save());

export default store;
