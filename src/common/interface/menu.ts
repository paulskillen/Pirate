import { ILink, INestedLink } from "./link";
import { sortBy, groupBy, isEmpty } from "lodash";

export interface IMenuItem extends INestedLink {
    icon?: string;
}

export type IMenu = IMenuItem[];

type TFooterLocation =
    | "footerWidget1"
    | "footerWidget2"
    | "footerWidget3"
    | "footerWidget4"
    | "footerWidget5"
    | "footerWidget6";

type TMobileMenuLocation =
    | "mobileWidget1"
    | "mobileWidget2"
    | "mobileWidget3"
    | "mobileWidget4"
    | "mobileWidget5";

type IWidgetLocation = TFooterLocation | TMobileMenuLocation;

type INavigationType = "customLink" | "productCategory";

export interface IBaseMenuItem {
    id?: string | null;
    navigation_type?: INavigationType | null;
    navigation_label?: string | null;
    navigation_icon?: string | null;
    navigation_url?: string | null;
    navigation_icon_position?: "none" | "before" | "after" | null;
    is_mega_menu?: boolean | null;
    number_column_menu?: string | number | null;
    column_menu?: string | null;
    column_width?: string | null;
    background_menu?: string | null;
    background_position?:
        | "left_top"
        | "left_center"
        | "left_bottom"
        | "center_top"
        | "center_bottom"
        | "center_center"
        | "right_top"
        | "right_center"
        | "right_bottom"
        | null;
    background_position_custom?: any;
    position?: string | null;
    parent_id?: string | null;
    is_column?: boolean | null;
    original?: boolean;
    url?: string | null;
    title?: string;
    is_hidden?: boolean;
    [key: string]: any;
}

export interface IBaseWidgetMenu {
    id?: string;
    location?: string | null;
    navigation?: Array<IBaseMenuItem>;
}

export interface IBaseWidgetItem {
    widget_type?: "block" | "menu";
    widget_name?: string;
    widget_location?: IWidgetLocation;
    menu: IBaseWidgetMenu;
    [key: string]: any;
}

export interface ISubmenuMenu {
    type: "menu";
    menu: IMenu;
}

export interface ISubmenuMegamenu {
    type: "megamenu";
}

export type ISubmenu = ISubmenuMenu | ISubmenuMegamenu;

export interface IMobileMenuLink extends INestedLink {
    type: "link" | "button";
    data?: any;
}

export type IMobileMenu = IMobileMenuLink[];

export interface INavLink extends ILink {
    submenu?: ISubmenu;
}

export type INav = INavLink[];
