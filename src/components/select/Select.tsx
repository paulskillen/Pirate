/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import { Select as SelectAnt } from "antd";
import { SelectProps as SelectAntProps } from "antd/es/select";
import ClassName from "classnames";
import { ViewTextError } from "d-react-components";
import React, { useImperativeHandle, useMemo, useRef } from "react";
import Icon from "../icon/Icon";

export interface SelectProps extends SelectAntProps<any> {
    classNameSelect?: string;
    classNameOption?: string;
    classNameLabel?: string;

    label?: string;
    dataSource?: Array<any>;
    error?: any;
    variant?: "outline" | "standard";
    name?: string;

    getLabel?: (item: any) => any;
    getKey?: (item: any) => any;
    getValue?: (item: any) => any;
    getDisableOption?: (item: any) => any;

    hasFilter?: boolean;
    multiple?: boolean;
    required?: boolean;
    hidden?: boolean;

    selectAll?: boolean;
    selectAllLabel?: string;
    deselectAllLabel?: string;
}
export interface SelectMethod {
    onBlur: () => void;
    onFocus: () => void;
}

const { Option } = SelectAnt;
const Select: React.ForwardRefRenderFunction<SelectMethod, SelectProps> = (
    {
        className,
        classNameSelect,
        classNameOption,
        classNameLabel,

        value = [],
        label,
        defaultValue = [],
        placeholder = "Please select",
        onChange,
        disabled,
        dataSource = [],
        error,
        multiple = false,

        getLabel = (item: any) => item.label,
        getKey = (item: any) => item.id,
        getValue = (item: any) => item?.id ?? null,
        getDisableOption = (item: any) => false,

        selectAll = false,
        selectAllLabel = "Select All",
        deselectAllLabel = "Deselect All",

        allowClear = true,
        variant = "outline",
        hasFilter = true,
        required,
        hidden,
        ...props
    }: SelectProps,
    ref
) => {
    const hasAnOptionSelected = useMemo(() => {
        return value && value.length > 0;
    }, [value]);

    const handelOnChange: SelectProps["onChange"] = (val, option) => {
        if (selectAll && val && val.length && val.includes("all")) {
            if (onChange) {
                if (hasAnOptionSelected) {
                    onChange([], []);
                } else {
                    const allValue = dataSource.map((item) => getValue(item));
                    onChange(allValue, dataSource);
                }
            }
        } else if (onChange) {
            onChange(val, option);
        }
    };

    const selectAllOption = useMemo(() => {
        return (
            <Option key="all" value="all" className={classNameOption}>
                {hasAnOptionSelected ? deselectAllLabel : selectAllLabel}
            </Option>
        );
    }, [hasAnOptionSelected]);

    const children = useMemo(
        () =>
            dataSource.map((dataItem: any) => {
                const label = getLabel(dataItem);
                const key = getKey(dataItem);
                const disabled = getDisableOption(dataItem);
                return (
                    <Option
                        key={key}
                        value={getValue(dataItem)}
                        disabled={disabled}
                        className={classNameOption}
                    >
                        {label}
                    </Option>
                );
            }),
        [dataSource]
    );
    const selectRef = useRef<React.ElementRef<typeof SelectAnt>>(null);

    useImperativeHandle(ref, () => ({
        onBlur: () => selectRef.current && selectRef.current.blur(),
        onFocus: () => selectRef.current && selectRef.current.focus(),
    }));

    const container = ClassName(
        "d-select__container",
        `d-select__container-${variant}`,
        className
    );
    const labelClass = ClassName(
        "text-label",
        { "text-label-required": required },
        classNameLabel
    );

    const selectClass = ClassName(
        "d-select__select",
        `d-select__select-${variant}`,
        {
            "d-select__select-disabled": disabled,
            "d-select__error": !!error,
        },
        classNameSelect
    );

    return (
        <div className={container} hidden={hidden}>
            {label && <label className={labelClass}>{label}</label>}
            <SelectAnt
                mode={multiple ? "multiple" : undefined}
                filterOption={(input: any, option: any) => {
                    const { children, value } = option.props;
                    if (!hasFilter) {
                        return true;
                    }
                    return (
                        (children &&
                            children
                                ?.toLowerCase()
                                .indexOf(input?.toLowerCase()) >= 0) ||
                        (value &&
                            `${value}`
                                ?.toLowerCase()
                                .indexOf(input?.toLowerCase()) >= 0)
                    );
                }}
                {...props}
                ref={selectRef}
                value={value}
                allowClear={allowClear}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={handelOnChange}
                className={selectClass}
                showArrow
                suffixIcon={<Icon icon="chevron-down" />}
                disabled={disabled}
                optionFilterProp="children"
            >
                {selectAll && selectAllOption}
                {children}
            </SelectAnt>
            <ViewTextError error={error} />
        </div>
    );
};

export default React.forwardRef(Select);
