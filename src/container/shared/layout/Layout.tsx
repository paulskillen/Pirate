import Path from "@/common/constant/path";
import Image from "@/components/image/Image";
import PostAffiliatePro, { PAPTrackingClick } from "@/components/third-party/PostAffiliatePro";
import AuthSignInView from "@/container/auth/shared/AuthSignInView";
import { useAuthAccessToken } from "@/store/auth/authHook";
import styled from "@emotion/styled";
import ClassNames from "classnames";
import { useRouter } from "next/router";
import React, { Fragment, PropsWithChildren, useMemo } from "react";
import TabBottom from "../navigation/TabBottom";

const IMG_MOBILE = 250;
const IMG_DESKTOP = 600;

export interface ILayoutProps extends PropsWithChildren<{}> {
    [key: string]: any;
}

const LogoView = () => {
    const router = useRouter();
    const dimLogo = useMemo(() => {
        return [Path.listCountry().href].includes(router.pathname);
    }, [router.pathname]);

    return (
        <React.Fragment>
            <div className="none lg:flex absolute top-0 bottom-0 left-0 right-0  flex-col justify-center items-center pointer-events-none">
                <Image
                    className="z-0"
                    alt="logo"
                    src="/images/logo/logo.png"
                    nextImageProps={{ width: IMG_DESKTOP, height: IMG_DESKTOP }}
                />
            </div>
            <div className="absolute top-0 bottom-0 left-0 right-0 flex lg:hidden flex-col justify-center items-center pointer-events-none">
                <Image
                    className={ClassNames("z-0", { "opacity-50": dimLogo })}
                    alt="logo"
                    src="/images/logo/logo.png"
                    nextImageProps={{ width: IMG_MOBILE, height: IMG_MOBILE }}
                />
            </div>
        </React.Fragment>
    );
};

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <LayoutStyled className="layout-container bg-black">
            <div className="flex-grow w-100">{children}</div>
            <TabBottom />
            {/* <PAPTrackingClick /> */}
            <PostAffiliatePro />
        </LayoutStyled>
    );
};

export default Layout;

export const LayoutClean: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <LayoutStyled className="layout-container bg-black">
            <div className="flex-grow w-100">{children}</div>
            <PostAffiliatePro />
        </LayoutStyled>
    );
};

export const LayoutAuth: React.FC<ILayoutProps> = ({ children }) => {
    const accessToken = useAuthAccessToken();

    if (!accessToken) {
        return (
            <Fragment>
                <AuthSignInView />
                <PostAffiliatePro />
            </Fragment>
        );
    }

    return (
        <LayoutStyled className="layout_container bg-black">
            {children}
            <PostAffiliatePro />
        </LayoutStyled>
    );
};

const LayoutStyled = styled.div`
    position: relative;
    display: flex;
    min-height: 100vh;
`;
