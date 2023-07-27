import styled from "@emotion/styled";
import { Button, ButtonProps } from "d-react-components";
import { useRouter } from "next/router";
import React from "react";

export interface IPageHeaderProps {
    title?: string;
    className?: string;
    leftButtonProps?: ButtonProps;
    showLeftButton?: boolean;
    onLeftClick?: () => void;
    customerCenter?: (() => React.ReactNode) | React.ReactNode | Element;
    customerLeft?: (() => React.ReactNode) | React.ReactElement | Element;
    customerRight?: (() => React.ReactNode) | React.ReactElement | Element;
}

const PageHeader: React.FC<IPageHeaderProps> = ({
    title,
    className,
    leftButtonProps = {},
    showLeftButton = true,
    onLeftClick,
    customerCenter,
    customerLeft,
    customerRight,
}) => {
    const router = useRouter();

    const renderLeft = () => {
        let left: any = (
            <Button
                onClick={() => {
                    if (onLeftClick) {
                        return onLeftClick();
                    }
                    return router.back();
                }}
                variant="trans"
                iconName="arrow_back_ios_new"
                className="px-0 page-header__left-button"
                color="light"
                {...leftButtonProps}
            />
        );
        if (customerLeft) {
            left =
                typeof customerLeft === "function"
                    ? customerLeft()
                    : customerLeft;
        } else if (!showLeftButton) {
            left = <div />;
        }
        return left;
    };

    const renderCenter = () => {
        if (customerCenter) {
            return typeof customerCenter === "function"
                ? customerCenter()
                : customerCenter;
        }
        if (title) {
            return (
                <div className="text-xl text-gold-light flex-1 text-center font-semibold">
                    {title}
                </div>
            );
        }
        return <div />;
    };

    const renderRight = () => {
        let right: any = <div className="w-5" />;
        if (customerRight) {
            right =
                typeof customerRight === "function"
                    ? customerRight()
                    : customerRight;
        }
        return right;
    };

    return (
        <PageHeaderStyled
            className={`page-header container  w-full flex flex-row items-center justify-between py-2 px-4 bg-black ${className}`}
        >
            {renderLeft()}
            {renderCenter()}
            {renderRight()}
        </PageHeaderStyled>
    );
};

export default PageHeader;

const PageHeaderStyled = styled.div`
    position: relative;
    z-index: 10;
    /* border-bottom: 0.1px solid var(--color-gold); */
    .page-header__left-button {
        color: var(--color-gold-light) !important;
    }
`;
