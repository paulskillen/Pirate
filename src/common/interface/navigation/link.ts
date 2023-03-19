import { LinkProps } from "next/link";

export interface ILink {
    title: string;
    is_hidden?: boolean;
    url?: string | ILinkProps;
    props?: {
        target?: "_blank";
    };
}

export interface INestedLink extends ILink {
    children?: this[];
}

export interface ILinkProps extends LinkProps {
    href: string;
}
