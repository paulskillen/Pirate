import React from "react";
import InputText from "./InputText";
import { InputTextProps } from "d-react-components";
import Icon from "../icon/Icon";
import styled from "@emotion/styled";
import { COLOR_GOLD } from "@/common/constant/app-style";

export interface IInputSearchProps extends Omit<InputTextProps, "onChange"> {
    onChange: (props: string) => any;
}

const InputSearch: React.FC<IInputSearchProps> = ({
    className,
    onChange,
    ...props
}) => {
    return (
        <InputText
            suffix={
                <Icon
                    id="input-text__clear-icon "
                    icon="close-outline"
                    useIconSet="carbon"
                    className="hover-pointer"
                    onClick={() => {
                        console.log("GET IN HERE");
                        onChange && onChange("");
                    }}
                />
            }
            prefix={<Icon icon="search" />}
            {...props}
            onChange={(e) => onChange && onChange(e?.target?.value)}
            wrapperElement={
                <InputSearchStyled
                    className={`d-input-text__container ${className}`}
                    {...(props as any)}
                />
            }
        />
    );
};

export default InputSearch;

const InputSearchStyled = styled.div`
    .d-input-text__prefix-container {
        width: fit-content !important;
        padding-left: 0.75rem !important;
        padding-right: 0.75rem !important;
        margin-left: 0 !important;
        svg {
            fill: ${COLOR_GOLD} !important;
        }
    }
    .d-input-text__input {
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
    }
    .d-input-text__suffix-container {
        width: fit-content !important;
        padding-left: 0.75rem !important;
        padding-right: 0.75rem !important;
        margin-left: 0 !important;
        svg {
            fill: ${COLOR_GOLD} !important;
        }
    }
`;
