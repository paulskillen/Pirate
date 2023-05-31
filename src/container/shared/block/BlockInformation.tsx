import ViewShowMore from "@/components/view/ViewShowMore";
import ClassNames from "classnames";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

export interface IBlockInformationProps {
    item?: any;
    position?: "left" | "right";
}

const BlockInformation: React.FC<IBlockInformationProps> = ({
    item,
    position = "left",
}) => {
    const { title, subTitle, description, image } = item || {};
    const renderImage = () => {
        return (
            <div className="col-span-3 position-relative block-information__image-wrapper px-0">
                <Image
                    className="block-information__image"
                    alt="block-information"
                    src={image}
                    style={{ objectFit: "fill" }}
                    fill
                />
            </div>
        );
    };
    return (
        <BlockInformationStyled className="grid grid-cols-12 mt-4 border p-3 rounded-2xl bg-black">
            {position === "left" && renderImage()}
            <div className="col-span-9">
                <div
                    className={`d-flex flex-column justify-content-center align-items-center  py-2 ${ClassNames(
                        {
                            "pl-3": position === "left",
                            "pr-3": position === "right",
                        }
                    )}`}
                >
                    <h5 className="title font-weight-bold text-white">
                        {title}
                    </h5>
                    {subTitle && (
                        <div className="subTitle font-weight-bold">
                            {subTitle}
                        </div>
                    )}
                    {description && (
                        <ViewShowMore className="text-gold" limitLength={100}>
                            {description}
                        </ViewShowMore>
                    )}
                </div>
            </div>
            {position === "right" && renderImage()}
        </BlockInformationStyled>
    );
};

export default BlockInformation;

const BlockInformationStyled = styled.div`
    border-color: rgba(192, 157, 94, 1) !important;
    .block-information__image-wrapper {
        padding-bottom: 100%;
        overflow: hidden;
        .block-information__image {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
`;
