import { IBase } from "./common";

export enum BlogStatus {
    ACTIVE = "ACTIVE",
    IN_ACTIVE = "IN_ACTIVE",
}

export enum BlogCategory {
    DEFAULT = "DEFAULT",
}

export const BLOG_STATUSES = [
    {
        id: BlogStatus.ACTIVE,
        label: "active",
    },
    {
        id: BlogStatus.IN_ACTIVE,
        label: "inactive",
    },
];
export const BLOG_CATEGORIES = [
    {
        id: BlogCategory.DEFAULT,
        label: "default",
    },
];

export interface IBlog extends IBase {
    blogNo: string;

    status: BlogStatus;

    title: string;

    fullDesc: string;

    shortDesc?: string;

    cover?: string;

    thumbnail?: string;

    category: string;

    homePageVisibility?: boolean;
}
