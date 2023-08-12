import React from "react";
import AppLink, { AppLinkProps } from "../link/AppLink";
import styled from "@emotion/styled";
import { COLOR_GOLD, COLOR_GOLD_LIGHT } from "@/common/constant/app-style";
import { ILinkProps } from "@/common/interface/link";

export interface IButtonLinkProps extends Partial<AppLinkProps> {
    children?: any;
    className?: string;
}

const ButtonLink: React.FC<IButtonLinkProps> = ({
    children,
    className,
    ...rest
}) => {
    return (
        <AppLink className="z-10" {...rest}>
            <ButtonLinkStyled className={className}>
                {children}
            </ButtonLinkStyled>
        </AppLink>
    );
};

export default ButtonLink;

const ButtonLinkStyled = styled.button`
    border: 1.5px solid ${COLOR_GOLD};
    background-color: black;
    color: white;
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    :hover {
        background-color: ${COLOR_GOLD};
        color: white !important;
    }
    :focus {
        border: 2.5px solid ${COLOR_GOLD_LIGHT} !important;
        outline: none;
    }
    :focus-visible {
        border: 2.5px solid ${COLOR_GOLD_LIGHT} !important;
        outline: none;
    }
`;
