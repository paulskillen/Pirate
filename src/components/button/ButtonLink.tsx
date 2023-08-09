import React from "react";
import AppLink from "../link/AppLink";
import styled from "@emotion/styled";
import { COLOR_GOLD } from "@/common/constant/app-style";
import { ILinkProps } from "@/common/interface/link";

export interface IButtonLinkProps extends Partial<ILinkProps> {
    children?: any;
    className?: string;
}

const ButtonLink: React.FC<IButtonLinkProps> = ({
    children,
    className,
    ...rest
}) => {
    return (
        <AppLink {...rest}>
            <ButtonLinkStyled className={className}>
                {children}
            </ButtonLinkStyled>
        </AppLink>
    );
};

export default ButtonLink;

const ButtonLinkStyled = styled.button`
    border: 1px solid ${COLOR_GOLD};
    background-color: black;
    color: white;
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    :hover {
        background-color: ${COLOR_GOLD};
        color: white !important;
    }
`;
