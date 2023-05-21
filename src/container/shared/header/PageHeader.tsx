import styled from "@emotion/styled";
import { Button, ButtonProps } from "d-react-components";
import { useRouter } from "next/router";
import React from "react";

export interface IPageHeaderProps {
    title?: string;
    className?: string;
    leftButtonProps?: ButtonProps;
    showLeftButton?: boolean;
    customerCenter?: (() => React.ReactNode) | React.ReactNode | Element;
    customerLeft?: (() => React.ReactNode) | React.ReactElement | Element;
    customerRight?: (() => React.ReactNode) | React.ReactElement | Element;
}

const PageHeader: React.FC<IPageHeaderProps> = ({
    title,
    className,
    leftButtonProps = {},
    showLeftButton = true,
    customerCenter,
    customerLeft,
    customerRight,
}) => {
    const router = useRouter();

    const renderLeft = () => {
        let left: any = (
            <Button
                onClick={() => router.back()}
                variant="trans"
                iconName="arrow_back_ios_new"
                className="px-0"
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
                <div className="text-xl text-white flex-1 text-center">
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
            className={`w-full flex flex-row items-center justify-between py-2 px-4 bg-primary border-b border-b-slate-500  rounded-b-3xl ${className}`}
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
`;
