import Path from "@/common/constant/path";
import PostAffiliatePro, {
    PAPTrackingClick,
} from "@/components/third-party/PostAffiliatePro";
import AuthSignInView from "@/container/auth/shared/AuthSignInView";
import { useAuthAccessToken } from "@/store/auth/authHook";
import styled from "@emotion/styled";
import ClassNames from "classnames";
import { useRouter } from "next/router";
import React, { Fragment, PropsWithChildren, useMemo } from "react";
import TabBottom from "../navigation/TabBottom";
import DesktopHeader from "../header/DesktopHeader";

export interface ILayoutProps extends PropsWithChildren<{}> {
    hideLogo?: boolean;
    [key: string]: any;
}

const Layout: React.FC<ILayoutProps> = ({ children, hideLogo }) => {
    return (
        <LayoutStyled className="layout-container bg-black">
            <DesktopHeader />
            <div className="flex-grow w-100">{children}</div>
            <TabBottom />
            {/* <PAPTrackingClick /> */}
            <PostAffiliatePro />
        </LayoutStyled>
    );
};

export default Layout;

export const LayoutClean: React.FC<ILayoutProps> = ({ children, hideLogo }) => {
    return (
        <LayoutStyled
            className={ClassNames("layout-container bg-black", {
                "layout-container--hide-logo": hideLogo,
            })}
        >
            <div className="flex-grow w-100">{children}</div>
            <PostAffiliatePro />
        </LayoutStyled>
    );
};

export const LayoutAuth: React.FC<ILayoutProps> = ({ children }) => {
    const accessToken = useAuthAccessToken();

    if (!accessToken) {
        return (
            <LayoutStyled className="layout_container bg-black">
                <AuthSignInView />
                <PostAffiliatePro />
            </LayoutStyled>
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
    flex-direction: column;
    min-height: 100vh;
    @media (min-width: 768px) {
        .tab-bottom {
            display: none !important;
        }
    }
`;
