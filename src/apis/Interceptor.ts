import { store } from "@/store/store";
import { ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { message } from "antd";
import { Notifications } from "d-react-components";
import { includes, map, some } from "lodash";
import { signOut } from "next-auth/react";
import Messages from "../languages/Messages";
import { signOutAction } from "../store/auth/authActions";

const UNAUTHORIZE = 401;
const DATA_ERROR = 400;

export const AuthMiddleware = new ApolloLink((operation, forward) => {
    try {
        const authState = store.getState().auth;

        console.log(
            "🚀 >>>>>> file: Interceptor.ts:18 >>>>>> AuthMiddleware >>>>>> authState:",
            authState
        );
        const accessToken = (store.getState().auth as any)?.accessToken;
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                Authorization: `Bearer ${accessToken}`,
            },
        }));
    } catch (error: any) {
        console.log({ error });
    }

    return forward(operation);
});

export const LangMiddleware = new ApolloLink((operation, forward) => {
    try {
        const language = Messages.getLanguage();
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                language: language || "en",
            },
        }));
    } catch (error: any) {
        console.log({ error });
    }

    return forward(operation);
});

// export const PermissionInterceptor = {
//     checkPermission: (config) => {
//         if (PermissionUtils.isGrantURLPermission(config.url, config.method)) {
//             return config;
//         }
//         const urlSlash = config.url.split("/");
//         const urlTail = urlSlash[urlSlash.length - 1];
//         Notifications.showError(Messages.youNotHavePermission + " " + urlTail);
//         return Promise.reject({
//             message: Messages.youNotHavePermission + " " + urlTail,
//         });
//     },
// };

const UNAUTHORIZE_MESSAGE = "Authentication token is wrong or expired";
const TOKEN_INVALID = "Token Invalid";
const UNAUTHORIZED = "Unauthorized";

export const UnauthorizeMiddleware = onError((error: any) => {
    const messageErrors = map(
        error?.graphQLErrors,
        (item: any) => item.message
    );
    const isUnauthorized = some(messageErrors, (message) =>
        [UNAUTHORIZED, UNAUTHORIZE_MESSAGE, TOKEN_INVALID].includes(message)
    );
    if (isUnauthorized && (store.getState() as any)?.auth?.accessToken) {
        Notifications.showError(Messages.tokenIsExpire);
        store.dispatch(signOutAction());
        signOut();
    }
});
