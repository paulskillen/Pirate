import AuthApi from "@/apis/auth/AuthApi";
import { SocialProvider } from "@/common/constant/app";
import Path from "@/common/constant/path";
import { signInAction } from "@/store/auth/authActions";
import { Progress } from "d-react-components";
import moment from "moment";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

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
    const dispatch = useDispatch();
    const { provider, className } = props;
    const { data: session } = useSession();
    // const signInAction = useSignIn();
    // const lastRouteLogin = useSelector(
    //     (state: any) => state?.metadata?.lastRouteLogin
    // );

    const providerData = useMemo(() => {
        switch (provider) {
            case "google":
                return {
                    imgSource: "/images/btnGoogle.png",
                    signUpUrl: Path.singUp().href,
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

    useEffect(() => {
        if (!session) return;
        const { expires, user, idToken } = session as any;
        if (!idToken) return;

        const expiresTime = moment(expires).valueOf();
        if (expiresTime < new Date().getTime()) {
            return;
        }
        const APISocial = [
            {
                method: AuthApi.loginSocial,
                params: [SocialProvider.GOOGLE, idToken],
            },
        ];
        Progress.show(APISocial, ([res]: any) => {
            const { accessToken, isRegistered, profile } =
                res?.data?.data ?? {};
            if (isRegistered) {
                dispatch(signInAction({ profile, accessToken }));
                return true;
            } else {
                router.push({
                    pathname: providerData.signUpUrl,
                    query: { profile: JSON.stringify(profile) },
                });
            }
        });
    }, [session]);

    return (
        <div
            className={`login__button_social bg-white shadow-sm border rounded-lg mt-3 flex justify-center items-center ${className} `}
            onClick={() =>
                signIn(provider, {
                    callbackUrl: document.URL + "?provider=" + provider,
                })
            }
        >
            <img src={providerData.imgSource} />
        </div>
    );
};
