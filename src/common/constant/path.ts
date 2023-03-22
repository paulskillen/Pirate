import { ILinkProps } from "@/common/interface/link";
import { join } from "lodash";

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

    // shopCategory: (category: any): ILinkProps => ({
    //     href: "/[...slug]",
    //     as: `/${category?.slug}/c${category?.categories_id}.html`,
    // }),
};

export default Path;
