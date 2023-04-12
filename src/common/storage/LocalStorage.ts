export function get(key: string, callback?: any) {
    if (!process.browser) {
        return undefined;
    }
    let state;
    try {
        state = localStorage.getItem(key);
        if (typeof state === "string") {
            state = JSON.parse(state);
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    return state || undefined;
}

export function set(key: string, value: any, callback?: any) {
    if (!process.browser) {
        return undefined;
    }
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}

export function remove(key: string, callback: any) {
    if (!process.browser) {
        return undefined;
    }
    try {
        localStorage.removeItem(key);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}

const LocalStorage = { get, set, remove };
export default LocalStorage;
