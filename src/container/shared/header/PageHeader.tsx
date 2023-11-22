import styled from "@emotion/styled";
import classNames from "classnames";
import { Button, ButtonProps } from "d-react-components";
import { useRouter } from "next/router";
import React, { CSSProperties } from "react";

export interface IPageHeaderProps {
    title?: string;
    style?: CSSProperties;
    className?: string;
    classNameTitle?: string;
    classNameWrapperTitle?: string;
    leftButtonProps?: ButtonProps;
    showLeftButton?: boolean;
    onLeftClick?: () => void;
    customerCenter?: (() => React.ReactNode) | React.ReactNode | Element;
    customerLeft?: (() => React.ReactNode) | React.ReactElement | Element;
    customerRight?: (() => React.ReactNode) | React.ReactElement | Element;
}

const PageHeader: React.FC<IPageHeaderProps> = ({
    title,
    style,
    className,
    classNameTitle,
    classNameWrapperTitle,
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
                className="px-0 page-header__left-button z-20"
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
        let content: any = (
            <div
                className={`text-xl text-gold-light flex-1 text-center  font-semibold ${classNames()} ${classNameTitle}`}
            >
                {title}
            </div>
        );
        if (customerCenter) {
            content =
                typeof customerCenter === "function"
                    ? customerCenter()
                    : customerCenter;
        }

        return (
            <div
                className={`absolute right-0 left-0 top-0 bottom-0 flex-center-y ${classNameWrapperTitle}`}
            >
                {content}
            </div>
        );
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
            style={style}
            className={`page-header mt-2 container relative w-full flex flex-row items-center justify-between py-2 px-4 bg-black ${className}`}
        >
            {renderLeft()}
            <div className="w-100 ">{renderCenter() as any}</div>
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
