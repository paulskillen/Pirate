import { IBlog } from "@/common/interface/blog";
import Messages from "@/languages/Messages";
import {
    FacebookShareButton,
    FacebookIcon,
    LineShareButton,
    LineIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from "react-share";
import styled from "@emotion/styled";
import { Icon, TimeUtils } from "d-react-components";
import React, { Fragment, useMemo } from "react";
import NoSSR from "../shared/NoSSR";
import MIcon from "../../components/icon/Icon";

export interface IBlogDetailProps {
    blog: IBlog;
}

const ICON_SOCIAL_SIZE = 24;

const BlogDetail: React.FC<IBlogDetailProps> = ({ blog }) => {
    const { fullDesc, shortDesc, createdAt, cover, title } = blog || {};

    const renderSocialSharing = (showShare?: boolean) => {
        // if (!process.browser) {
        //     return <div />;
        // }
        return (
            <NoSSR>
                <div className="flex-center-y gap-3 ">
                    {showShare && (
                        <Icon name="share" className="text-primary" />
                    )}
                    <FacebookShareButton url={window.location.href}>
                        <FacebookIcon
                            size={ICON_SOCIAL_SIZE}
                            className="rounded-md"
                        />
                    </FacebookShareButton>

                    <LineShareButton
                        url={window.location.href}
                        className="blog-header__share-button"
                    >
                        <LineIcon
                            size={ICON_SOCIAL_SIZE}
                            className="rounded-md"
                        />
                    </LineShareButton>
                    <TwitterShareButton url={window.location.href}>
                        <TwitterIcon
                            size={ICON_SOCIAL_SIZE}
                            className="rounded-md"
                        />
                    </TwitterShareButton>
                    <WhatsappShareButton url={window.location.href}>
                        <WhatsappIcon
                            size={ICON_SOCIAL_SIZE}
                            className="rounded-md"
                        />
                    </WhatsappShareButton>
                    <LinkedinShareButton url={window.location.href}>
                        <LinkedinIcon
                            size={ICON_SOCIAL_SIZE}
                            className="rounded-md"
                        />
                    </LinkedinShareButton>
                </div>
            </NoSSR>
        );
    };

    const renderBlogHeader = useMemo(() => {
        return (
            <BlogHeaderStyled className="w-100 relative h-[200px] md:h-[450px] flex flex-col justify-end bg-red-200">
                <div className="relative container z-10 ">
                    <h1 className="z-10 h1  text-primary-light">{title}</h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: shortDesc ?? "" }}
                        className="typography mt-3 text-gray-200"
                    />
                    <div className="flex-center-y justify-between mb-3">
                        {renderSocialSharing(true)}
                        <div className="text text-white font-bold text-end ">
                            <span className="text-primary ">Pirate Mobile</span>
                            <span> • </span>
                            <span className="text-primary">Spain</span>
                            <span> • </span>
                            <span className="text-primary">
                                {TimeUtils.convertMiliToDateWithFormat(
                                    createdAt,
                                    "MMM YYYY"
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <img
                    className="absolute h-100 w-100 left-0 right-0 bottom-0 top-0 z-0 blog-header__cover"
                    alt="blog_cover"
                    src={cover || "/images/information/cover_1.jpeg"}
                    style={{ objectFit: "cover" }}
                />
                <div className="bg-gradient-to-b from-gray-100  to-black to-100  ... h-[200px] md:h-[450px] z-11 opacity-60 absolute bottom-0 left-0 right-0" />
            </BlogHeaderStyled>
        );
    }, [cover, title, shortDesc]);

    const renderBlogContent = useMemo(() => {
        return (
            <Fragment>
                <div className="container post-detail__content-main">
                    <div
                        dangerouslySetInnerHTML={{ __html: fullDesc ?? "" }}
                        className="typography"
                    />
                    <div className="p-3 flex items-center justify-between bg-gray-800 rounded-md mt-5">
                        <div className="flex-center-y w-50">
                            <Icon name="share" className="text-primary" />
                            <h5 className="mb-0 ml-3 post-detail__share-social-text text-primary">
                                {Messages.shareToYourFriend}
                            </h5>
                        </div>
                        {renderSocialSharing()}
                    </div>
                </div>
            </Fragment>
        );
    }, [fullDesc]);
    return (
        <div className="relative z-10">
            {renderBlogHeader}
            {renderBlogContent}
        </div>
    );
};

export default BlogDetail;

const BlogHeaderStyled = styled.div`
    .blog-header__cover {
        filter: "blur(3px)";
    }
`;
