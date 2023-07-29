import ColorUtils from "@/common/utils/ColorUtils";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import classNames from "classnames";
import React, { CSSProperties } from "react";

export interface ViewLabelStatusProps {
    color?: string;
    content?: string;
    className?: string;
    style?: CSSProperties;
    dataSource?: any[];
    value?: any;
    getValue?: (item: any) => any;
    getLabel?: (item: any) => any;
    showDot?: boolean;
}
const ViewLabelStatus = ({
    color = "#000000",
    content,
    className = "",
    style = {},
    dataSource,
    value,
    showDot,
    getValue = (item) => item?.id,
    getLabel = (item) => (Messages as any)[item?.label],
}: ViewLabelStatusProps) => {
    const classNameContainer = classNames(
        "d-view-label-status border",
        className
    );
    let colorStatus = "#000000";
    let labelStatus;

    if (color) {
        colorStatus = color;
    }
    if (content) {
        labelStatus = content;
    }
    if (dataSource && dataSource?.length > 0 && value) {
        try {
            const foundStatus = dataSource?.find(
                (item) => getValue(item) === value
            );
            if (foundStatus) {
                colorStatus = foundStatus?.color;
                labelStatus = getLabel(foundStatus);
            }
        } catch (error) {
            console.error({ error });
        }
    }
    const styleLabelContainer = {
        backgroundColor: colorStatus
            ? ColorUtils.hexToRGB(colorStatus, 0.2)
            : undefined,
    };
    const styleLabelDot = {
        backgroundColor: colorStatus,
    };
    const styleLabelContent = {
        color: colorStatus,
    };
    return (
        <ViewLabelStatusStyle
            className={classNameContainer}
            style={{ ...styleLabelContainer, ...style }}
        >
            {showDot && (
                <div
                    className="d-view-label-status__dot mr-3"
                    style={styleLabelDot}
                />
            )}
            <text className="text-xx-small" style={styleLabelContent}>
                {labelStatus}
            </text>
        </ViewLabelStatusStyle>
    );
};

export default ViewLabelStatus;

const ViewLabelStatusStyle = styled.div``;
