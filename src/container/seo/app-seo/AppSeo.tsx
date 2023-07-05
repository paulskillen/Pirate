import React from "react";
import { DefaultSeo, DefaultSeoProps } from "next-seo";

export interface IAppSeoProps {
    [key: string]: any;
}
const DefaultTitle = "Pirate Mobile | Esims";
const DefaultDescription =
    "Pirate Mobile eSim is a revolutionary technology that allows you to activate a mobile connection without the need for a physical SIM card";

const DEFAULT_CONFIG_SEO: DefaultSeoProps = {
    title: "Esims",
    titleTemplate: "Pirate Mobile | %s",
    description: DefaultDescription,

    openGraph: {
        title: DefaultTitle,
        description: DefaultDescription,
        url: "https://www.piratemobile.gg/",
        type: "store",
        locale: "en_IE",
        siteName: "pirate mobile",
        // profile: {
        //     firstName: "Trung",
        //     lastName: "Do Xuan",
        //     username: "trung dev",
        //     gender: "male",
        // },
        images: [
            {
                url: "/images/logo/logo.png",
                width: 500,
                height: 500,
                alt: "site logo",
            },
            {
                url: "/images/logo/logo.png",
                width: 300,
                height: 300,
                alt: "site logo",
            },
        ],
    },
    // twitter: {
    //     handle: "@trung-dev",
    //     site: "@trung-dev",
    //     cardType: "summary_large_image",
    // },
    // additionalLinkTags: [
    //     {
    //         href: "/images/avatar.jpg",
    //         rel: "icon",
    //     },
    // ],
    // additionalMetaTags: [
    //     { property: "dc:creator", content: "Do Xuan Trung" },
    //     { property: "application-name", content: "trung-dev" },
    // ],
};

const AppSeo: React.FC<IAppSeoProps> = ({ id }) => {
    return <DefaultSeo {...DEFAULT_CONFIG_SEO} />;
};

export default AppSeo;
