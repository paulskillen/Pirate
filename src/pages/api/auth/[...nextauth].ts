import { CONFIG } from "@/configuration/AppConfig";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: CONFIG?.GOOGLE_CLIENT_ID,
            clientSecret: CONFIG?.GOOGLE_CLIENT_SECRET,
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

    secret: "PIRATE_MOBILE",
});
