import React, { useState, useEffect } from "react";
import Button from "../button/Button";
import Select, { SelectProps } from "./Select";

export interface SelectConfirmationProps extends SelectProps {
    footerClassName?: string;
    confirmText?: string;
    cancelText?: string;
    onChange?: (val: any) => void;
}
const SelectConfirmation = (props: SelectConfirmationProps) => {
    const {
        footerClassName,
        onChange,
        defaultValue,
        confirmText,
        cancelText,
        ...selectProps
    } = props;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defaultValue);

    const onBlur = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            setValue(defaultValue);
        }
    }, [open]);

    return (
        <Select
            {...selectProps}
            open={open}
            onFocus={() => {
                setOpen(true);
            }}
            onBlur={onBlur}
            value={value}
            onChange={(val) => setValue(val)}
            filterOption={() => true}
            showSearch
            dropdownRender={(menu) => (
                <React.Fragment>
                    {menu}
                    <div className={footerClassName}>
                        <Button
                            style={{ marginRight: "5px" }}
                            color="muted"
                            onClick={(e) => {
                                setValue(defaultValue);
                            }}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            onClick={(e) => {
                                if (onChange) {
                                    onChange(value);
                                }
                            }}
                        >
                            {confirmText}
                        </Button>
                    </div>
                </React.Fragment>
            )}
            getPopupContainer={(node: any) => node}
        />
    );
};

export default SelectConfirmation;
