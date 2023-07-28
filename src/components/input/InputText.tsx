import React from "react";
import { InputText as DInputText, InputTextProps } from "d-react-components";
import styled from "@emotion/styled";

export interface IInputTextProps extends Omit<InputTextProps, "variant"> {
    variant?: InputTextProps["variant"] | "pirate-mobile";
}

const InputText: React.FC<IInputTextProps> = ({ className, ...props }) => {
    return (
        <DInputText
            wrapperElement={
                <InputStyled
                    className={`d-input-text__container ${className}`}
                    {...(props as any)}
                />
            }
            {...(props as any)}

        />
    );
};

export default InputText;

const InputStyled = styled.div`
    .d-input-text__input {
        ${(props: IInputTextProps) => {
            if (props?.variant === "pirate-mobile") {
                return {
                    "border-radius": `999px !important`,
                    backgroundColor: "black",
                    border: "1px solid var(--color-gold) !important",
                    color: "white",
                };
            }
            return {};
        }}
    }
    .d-input-text__error {
        ${(props: IInputTextProps) => {
            if (props?.variant === "pirate-mobile") {
                return {
                    "border-radius": `999px !important`,
                    backgroundColor: "black",
                    border: "1px solid var(--color-gold) !important",
                    color: "white",
                };
            }
            return {};
        }}
    }
    .d-input-text__error-view {
        ${(props: IInputTextProps) => {
            if (props?.variant === "pirate-mobile") {
                return {
                    "margin-top": "5px !important",
                    "margin-left": "10px !important",
                    "font-size": "12px !important",
                };
            }
            return {};
        }}
    }
`;
