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
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
        signIn: async ({ user, credentials, account, email, profile }) => {
            console.log(
                "🚀 >>>>>> file: [...nextauth].ts:27 >>>>>> signIn: >>>>>> user:",
                user
            );
            console.log(
                "🚀 >>>>>> file: [...nextauth].ts:27 >>>>>> signIn: >>>>>> credentials:",
                credentials
            );
            console.log(
                "🚀 >>>>>> file: [...nextauth].ts:27 >>>>>> signIn: >>>>>> account:",
                account
            );
            console.log(
                "🚀 >>>>>> file: [...nextauth].ts:27 >>>>>> signIn: >>>>>> email:",
                email
            );
            console.log(
                "🚀 >>>>>> file: [...nextauth].ts:27 >>>>>> signIn: >>>>>> profile:",
                profile
            );
            try {
                const resLogin = await AuthApi.loginSocial(
                    SocialProvider.GOOGLE,
                    account?.id_token ?? ""
                );
                console.log(
                    "🚀 >>>>>> file: [...nextauth].ts:52 >>>>>> signIn: >>>>>> resLogin:",
                    resLogin
                );
                const { accessToken, isRegistered, profile } =
                    resLogin?.data?.data ?? {};
                if (isRegistered) {
                    return true;
                }
                console.log(
                    "🚀 >>>>>> file: [...nextauth].ts:68 >>>>>> signIn: >>>>>> profile:",
                    profile
                );
                store.dispatch(saveRegister(profile));

                return `${CONFIG.DOMAIN}/${Path.singUp().href}`;
            } catch (error: any) {
                console.error("Error call apis:", JSON.stringify(error));
            }

            return false;
        },
    },
});
