import React, { PropsWithChildren } from "react";
import TabBottom from "../tab/TabBottom";
export interface ILayoutProps extends PropsWithChildren<{}> {
    [key: string]: any;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <div className="layout_container bg-black">
            {children}
            <TabBottom />
        </div>
    );
};

export default Layout;

export const LayoutSecure: React.FC<ILayoutProps> = ({ children }) => {
    return <div className="layout_container bg-black">{children}</div>;
};
