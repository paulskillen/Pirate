import Path from "@/common/constant/path";
import Image from "@/components/image/Image";
import ClassNames from "classnames";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useMemo } from "react";
import TabBottom from "../tab/TabBottom";

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
            <div className="lg:hidden absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center pointer-events-none">
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
        <div className="layout_container bg-black">
            {children}
            <TabBottom />
            <LogoView />
        </div>
    );
};

export default Layout;

export const LayoutSecure: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <div className="layout_container bg-black">
            {children}
            <LogoView />
        </div>
    );
};
