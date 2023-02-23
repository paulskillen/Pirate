import { TreeSelect as TreeSelectAnt, TreeSelectProps as TreeSelectPropsAnt } from "antd";
import classname from "classnames";
import ViewTextError from "../view/ViewTextError";

export interface TreeSelectProps extends TreeSelectPropsAnt {
    className?: string;
    classNameSelect?: string;

    value: any[];
    label?: string;
    placeholder?: string;
    onChange?: any;
    disabled?: boolean;
    dataSource?: any[];
    error?: string;
    multiple?: boolean;

    allowClear?: boolean;
    variant?: "outline" | "standard";
}

const TreeSelect = ({
    className,
    classNameSelect,

    value = [],
    label,
    placeholder = "Please select",
    onChange,
    disabled,
    dataSource = [],
    error,
    multiple = false,

    allowClear = true,
    variant = "outline",
    ...rest
}: TreeSelectProps) => {
    const container = classname("d-select__container", `d-select__container-${variant}`, className);
    const labelClass = classname("text-label", "d-select__label");

    const selectClass = classname(
        "d-select__select",
        `d-select__select-${variant}`,
        {
            "d-select__select-disabled": disabled,
            "d-select__error": !!error,
        },
        classNameSelect
    );

    return (
        <div className={container}>
            {label && <label className={labelClass}>{label}</label>}

            <TreeSelectAnt
                className={selectClass}
                disabled={disabled}
                treeData={dataSource}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                multiple={multiple}
                allowClear={allowClear}
                {...rest}
            />

            <ViewTextError error={error} />
        </div>
    );
};

export default TreeSelect;
