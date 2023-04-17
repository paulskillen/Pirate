import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Path from "@/common/constant/path";

export interface IAuthSignInSocialProps {
    [key: string]: any;
}

interface IButtonLoginSocial {
    provider: string;
    className?: string;
}

const AuthSignInSocial: React.FC<IAuthSignInSocialProps> = ({ id }) => {
    return (
        <div>
            <ButtonSignSocial provider="google" className="" />
        </div>
    );
};

export default AuthSignInSocial;

const ButtonSignSocial = (props: IButtonLoginSocial) => {
    const router = useRouter();
    const { provider, className } = props;
    const { data } = useSession();

    console.log(
        "🚀 >>>>>> file: AuthSignInSocial.tsx:30 >>>>>> ButtonSignSocial >>>>>> data:",
        data
    );
    // const signInAction = useSignIn();
    // const { query } = queryString.parseUrl(router.asPath);
    // const queryProvider = query?.provider;
    // const lastRouteLogin = useSelector(
    //     (state: any) => state?.metadata?.lastRouteLogin
    // );

    const providerData = useMemo(() => {
        switch (provider) {
            case "google":
                return {
                    imgSource: "/images/btnGoogle.png",
                    // signUpUrl: Path.accountSignUpGoogle().href,
                };
            // case "facebook":
            //     return {
            //         imgSource: "/images/btnFacebook.png",
            //         signUpUrl: url.accountSignUpFacebook().href,
            //     };
            default:
                return {};
        }
    }, [provider]);

    // useEffect(() => {
    //     if (!queryProvider || !session || provider !== queryProvider) return;

    //     const { expires, accessToken } = session;
    //     const expiresTime = moment(expires).valueOf();
    //     if (expiresTime < new Date().getTime()) {
    //         return;
    //     }

    //     const body = {
    //         access_token: accessToken,
    //         provider,
    //     };
    //     const APISocial = [
    //         { method: API.authenticateSocialAccount, params: [body] },
    //     ];
    //     Progress.show(APISocial, ([res]: any[]) => {
    //         const socialRes = res?.data?.data ?? {};
    //         const { access_token, profile, social } = socialRes;

    //         if (socialRes.is_login) {
    //             signInAction({ token: access_token, profile });
    //             router.push(lastRouteLogin);
    //         } else {
    //             router.push({
    //                 pathname: providerData.signUpUrl,
    //                 query: { id: social?.id, token: social.token },
    //             });
    //         }
    //     });
    // }, [session]);

    return (
        <div
            className={`login__button_social shadow-sm border rounded-lg mt-3 flex justify-center items-center ${className} `}
            onClick={() => signIn(provider)}
        >
            <img src={providerData.imgSource} />
        </div>
    );
};
