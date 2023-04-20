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
            try {
                const resLogin = await AuthApi.loginSocial(
                    SocialProvider.GOOGLE,
                    account?.id_token ?? ""
                );
                const { accessToken, isRegistered, profile } =
                    resLogin?.data?.data ?? {};
                if (isRegistered) {
                    return true;
                }
                return `${CONFIG.DOMAIN}/${
                    Path.singUp().href
                }?profile=${JSON.stringify(profile)}`;
            } catch (error: any) {
                console.error("Error call apis:", JSON.stringify(error));
            }

            return false;
        },

        jwt: async ({ token, user, account, profile, isNewUser }) => {
            console.log(
                "🚀 >>>>>> file: [...nextauth].ts:54 >>>>>> jwt: >>>>>> account:",
                account
            );
            // Add access_token to the token right after signin
            if (account?.accessToken) {
                token.accessToken = account.accessToken;
            }
            return token;
        },

        session: ({ session, token, user }) => {
            //@ts-ignore
            session.accessToken = token.accessToken;
            return session;
        },
    },
});
