import ViewShowMore from "@/components/view/ViewShowMore";
import ClassNames from "classnames";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";

export interface IBlockInformationProps {
    item?: any;
    position?: "left" | "right";
}

const BlockInformation: React.FC<IBlockInformationProps> = ({
    item,
    position = "left",
}) => {
    const { title, subTitle, description, image, link } = item || {};
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

    const renderSubContent = () => {
        if (link) {
            return (
                <div className="w-100">
                    <ViewShowMore className="text-gold" limitLength={100}>
                        {description}
                    </ViewShowMore>
                    <div className="w-100 flex justify-center opacity-60 ">
                        <AppLink
                            className="text-center"
                            href={link}
                        >{`>> ${Messages.showMore}`}</AppLink>
                    </div>
                </div>
            );
        }
        if (description) {
            return (
                <ViewShowMore className="text-gold" limitLength={100}>
                    {description}
                </ViewShowMore>
            );
        }
        return null;
    };

    return (
        <BlockInformationStyled className="md:col-span-6 border p-3 rounded-2xl bg-black">
            {/* {position === "left" && renderImage()} */}
            <div className="">
                <div
                    className={`d-flex flex-column justify-content-center align-items-center  py-2`}
                >
                    <h5 className="title font-weight-bold text-white">
                        {title}
                    </h5>
                    {subTitle && (
                        <div className="subTitle font-weight-bold">
                            {subTitle}
                        </div>
                    )}
                    {renderSubContent()}
                </div>
            </div>
            {/* {position === "right" && renderImage()} */}
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
