import { Select as SelectAnt } from "antd";
import classNames from "classnames";
import React, { useMemo, useState } from "react";
import Icon from "../icon/Icon";
import { isEmpty } from "lodash";

const { Option } = SelectAnt;
export interface SelectProps {
    onChange?: (props: any) => void;
    dataSource?: any[];
    getLabel?: (item: any) => any;
    getKey?: (item: any) => any;
    getValue?: (item: any) => any;
    defaultValue?: string[];
    placeholder?: string;
    name?: string;
    mode?: "multiple" | "tags" | undefined;
    allowClear?: boolean;
    className?: string;
    containerClassName?: string;
    value?: string[] | any;
    error?: any;
    disabled?: boolean;
    [key: string]: any;
}

function Select(props: SelectProps) {
    const {
        onChange,
        dataSource = [],
        getLabel = (item: { label: string }) => item.label,
        getKey = (item: { id: string }) => item.id,
        defaultValue = [],
        placeholder = "Please select",
        mode,
        allowClear = true,
        className = "",
        containerClassName = "",
        value = [],
        error,
        getValue = (item: any) => item?.id ?? null,
        disabled = false,
    } = props;
    const [onFocus, setOnFocus] = useState(false);
    const children = useMemo(
        () =>
            dataSource.map((dataItem) => {
                const label = getLabel(dataItem);
                const key = getKey(dataItem);
                return (
                    <Option key={key} value={getValue(dataItem)}>
                        {label}
                    </Option>
                );
            }),
        [dataSource]
    );
    const selectContainerClass = classNames(
        "d-select__container",
        { "custom-select__container-focus": onFocus },
        { "custom-select__container-disable": disabled },
        containerClassName
    );
    const selectClass = classNames("custom-select__select", `${className}`);
    return (
        <>
            <div className={selectContainerClass}>
                <label
                    className="text-white mb-1"
                    data-layout={!isEmpty(value) ? "visible" : "hidden"}
                >
                    {placeholder}
                </label>
                <SelectAnt
                    {...props}
                    value={value}
                    mode={mode}
                    allowClear={allowClear}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    className={selectClass}
                    suffixIcon={null}
                    onFocus={() => setOnFocus(true)}
                    onBlur={() => setOnFocus(false)}
                >
                    {children}
                </SelectAnt>
                <Icon
                    icon="unfold_more"
                    className="custom-select__arrow-icon"
                />
            </div>
            {error && (
                <small className="text-danger form-error-message">
                    <span>*</span>
                    {error}
                </small>
            )}
        </>
    );
}

export default Select;
