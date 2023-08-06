import { ILinkProps } from "@/common/interface/link";

const Path = {
    home: (): ILinkProps => ({
        href: "/",
    }),

    listCountry: (): ILinkProps => {
        return {
            href: "/list-country",
        };
    },

    // ----------------------------------------
    // -- BUNDLE
    // ----------------------------------------

    bundleByCountry: (countryCode: string): ILinkProps => {
        return {
            href: "/bundle/by-country/[countrySlug]",
            as: `/bundle/by-country/${countryCode}`,
        };
    },

    // ----------------------------------------
    // -- CART AND CHECK OUT
    // ----------------------------------------

    checkout: (): ILinkProps => ({
        href: "/checkout",
    }),

    checkoutPayment: (
        orderStatus?: string,
        orderId?: string,
        orderHash?: string
    ): ILinkProps => ({
        href: "/checkout/successful/[orderStatus]/[orderId]/[orderHash]",
        as: `/checkout/successful/order-${orderStatus}/${orderId}/${orderHash}`,
    }),

    // ----------------------------------------
    // -- CATEGORY AND PRODUCT
    // ----------------------------------------

    // category: (category: ICategory): ILinkProps => {
    //     if (category.type === "shop") {
    //         return url.shopCategory(category);
    //     }
    //     if (category.type === "blog") {
    //         return url.newsList();
    //     }

    //     throw Error("Undefined category type");
    // },

    // ----------------------------------------
    // -- USER
    // ----------------------------------------

    profile: (): ILinkProps => ({
        href: "/profile",
    }),

    // ----------------------------------------
    // -- ORDER
    // ----------------------------------------

    orderHistory: (): ILinkProps => ({
        href: "/order/history",
    }),

    orderDetail: (order: any): ILinkProps => ({
        href: "/order/detail/[orderSlug]",
        as: `/order/detail/${order?.id}`,
    }),

    // ----------------------------------------
    // -- ESIMS
    // ----------------------------------------

    esimsHistory: (): ILinkProps => ({
        href: "/esims/history",
    }),

    esimsDetail: (order: any): ILinkProps => ({
        href: "/esims/detail/[esimSlug]",
        as: `/esims/detail/${order?.id}`,
    }),
    // ----------------------------------------
    // -- ESIMS
    // ----------------------------------------

    information: (): ILinkProps => ({
        href: "/information",
    }),

    landing: (): ILinkProps => ({
        href: "/landing",
    }),

    // ----------------------------------------
    // -- AUTH
    // ----------------------------------------

    singIn: (): ILinkProps => ({
        href: "/profile",
    }),

    singUp: (): ILinkProps => ({
        href: "/login/sign-up",
    }),

    signUpGoogle: (): ILinkProps => ({
        href: "/login/sign-up/google",
    }),

    // ----------------------------------------
    // -- STATIC PAGES
    // ----------------------------------------

    setting: (): ILinkProps => ({
        href: "/setting",
    }),

    aboutUs: (): ILinkProps => ({
        href: "/about-us",
    }),

    promos: (): ILinkProps => ({
        href: "/promos",
    }),

    policy: (): ILinkProps => ({
        href: "/policy",
    }),

    termConditions: (): ILinkProps => ({
        href: "/term-conditions",
    }),

    compatibleDevice: (): ILinkProps => ({
        href: "/compatible-device",
    }),

    helpCenter: (): ILinkProps => ({
        href: "/help-center",
    }),

    blogs: (): ILinkProps => ({
        href: "/blogs",
    }),

    affiliatePage: (): ILinkProps => ({
        href: "/affiliate",
    }),
};

export default Path;
