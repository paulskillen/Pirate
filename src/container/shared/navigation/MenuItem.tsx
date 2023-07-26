import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { Icon } from "d-react-components";
import { filter } from "lodash";
import React, { useState } from "react";

export interface IMenuItemProps {
    [key: string]: any;
}

const MenuItem: React.FC<IMenuItemProps> = ({ menu }) => {
    const { id, label, icon, path, onClick } = menu;
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const subMenuList = menu.subMenu ?? [];
    const hasSubMenu =
        filter(subMenuList, (item) => item.show !== false)?.length > 0;

    const onClickMenuItem = () => {
        setOpenSubMenu(!openSubMenu);
    };

    return (
        <AppLink href={path} className="w-full" style={{ width: "100%" }}>
            <MenuItemStyled className="flex flex-row items-center mt-4 w-full p-3 rounded-xl border-gold">
                <Icon name={icon} className="text-gold" size="x-large" />
                <div className="text-lg text-gold ml-3">
                    {(Messages as any)[label]}
                </div>
            </MenuItemStyled>
        </AppLink>
    );
};

export default MenuItem;

const MenuItemStyled = styled.div`
    background-color: rgba(253, 253, 253, 0.15) !important;
`;
