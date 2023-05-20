import AuthApi from "@/apis/auth/AuthApi";
import { SocialProvider } from "@/common/constant/app";
import Path from "@/common/constant/path";
import { CONFIG } from "@/configuration/AppConfig";
import { saveRegister } from "@/store/auth/authActions";
import { store } from "@/store/store";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId:
                (process.env.GOOGLE_CLIENT_ID as string) ||
                "1060585065695-kl1dpg1pv18kq6vvuqsjos19laptjc9g.apps.googleusercontent.com",
            clientSecret:
                (process.env.GOOGLE_CLIENT_SECRET as string) ||
                "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",
        }),
        // ...add more providers here
    ],
    logger: {
        error(code, metadata) {
            console.error(code, metadata);
        },
        warn(code) {
            console.warn(code);
        },
        debug(code, metadata) {
            console.debug(code, metadata);
        },
    },
    callbacks: {
        // signIn: async ({ user, credentials, account, email, profile }) => {
        //     try {
        //         const resLogin = await AuthApi.loginSocial(
        //             SocialProvider.GOOGLE,
        //             account?.id_token ?? ""
        //         );
        //         const { accessToken, isRegistered, profile } =
        //             resLogin?.data?.data ?? {};
        //         if (isRegistered) {
        //             return true;
        //         }
        //         return `${CONFIG.DOMAIN}/${
        //             Path.singUp().href
        //         }?profile=${JSON.stringify(profile)}`;
        //     } catch (error: any) {
        //         console.error("Error call apis:", JSON.stringify(error));
        //     }

        //     return false;
        // },

        jwt: async ({ token, user, account, profile, isNewUser }) => {
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }
            if (account?.id_token) {
                token.idToken = account.id_token;
            }
            return token;
        },

        session: ({ session, token, user }) => {
            //@ts-ignore
            session.accessToken = token.accessToken;
            //@ts-ignore
            session.idToken = token.idToken;
            return session;
        },
    },
});
