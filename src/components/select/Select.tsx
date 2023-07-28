import {
    COLOR_DARKEN,
    COLOR_GOLD,
    COLOR_GOLD_TRANS,
    COLOR_INPUT_CONTENT,
} from "@/common/constant/app-style";
import styled from "@emotion/styled";
import ClassNames from "classnames";
import { SelectProps, Select as DSelect } from "d-react-components";
import React from "react";

export interface IInputSelectProps extends SelectProps {
    renderFooterDropdown?: () => React.ReactElement;
}

const Select: React.FC<IInputSelectProps> = ({
    variant,
    className,
    hidden,
    renderFooterDropdown,
    ...props
}) => {
    const container = ClassNames(
        "d-select__container",
        `d-select__container-${variant}`,
        className
    );

    const renderDropdown = (menu: React.ReactElement) => {
        return (
            <DropdownStyled id="select__dropdown-pirate-mobile">
                {menu}
                {renderFooterDropdown && renderFooterDropdown()}
            </DropdownStyled>
        );
    };

    return (
        <DSelect
            {...props}
            dropdownRender={renderDropdown}
            wrapperElement={
                <SelectStyled className={container} hidden={hidden} />
            }
        />
    );
};

export default Select;

const SelectStyled = styled.div`
    .ant-select-selector {
        .ant-select-selection-item {
            color: ${COLOR_INPUT_CONTENT} !important;
        }
    }

    .ant-select-clear {
        background-color: transparent !important;
        color: white;
    }

    .ant-select-arrow {
        color: ${COLOR_GOLD};
    }

    .select-country {
        .ant-select-arrow {
            margin-top: -10px !important;
        }
        .ant-select-selection-search-input {
            /* color: ${COLOR_GOLD} !important; */
            /* &::placeholder {
                color: ${COLOR_GOLD} !important;
            } */
            /* ::-webkit-input-placeholder {
            } */
            /* input::placeholder {
                color: #909 !important;
            } */
            /* input::-webkit-input-placeholder {
                color: #909 !important;
            } */
        }
    }
`;
const DropdownStyled = styled.div`
    background-color: ${COLOR_DARKEN};
    border-top: 1px solid ${COLOR_GOLD};
    border-bottom: 1px solid ${COLOR_GOLD};
    border-left: 1px solid ${COLOR_GOLD};
    border-right: 1px solid ${COLOR_GOLD};
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    overscroll-behavior: contain !important; /*   <--- the trick    */
    .ant-select-item-option {
        color: ${COLOR_INPUT_CONTENT};
    }

    .ant-select-item-option-active {
        background-color: ${COLOR_GOLD_TRANS} !important;
    }
`;
