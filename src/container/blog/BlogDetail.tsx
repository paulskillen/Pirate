import { IBlog } from "@/common/interface/blog";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { Icon, TimeUtils } from "d-react-components";
import React, { useMemo } from "react";
import {
    FacebookIcon,
    FacebookShareButton,
    LineIcon,
    LineShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";
import NoSSR from "../shared/NoSSR";
import { useRouter } from "next/router";
import Path from "@/common/constant/path";

export interface IBlogDetailProps {
    blog: IBlog;
}

const ICON_SOCIAL_SIZE = 24;

const BlogDetail: React.FC<IBlogDetailProps> = ({ blog }) => {
    const { fullDesc, shortDesc, createdAt, cover, title } = blog || {};
    const router = useRouter();

    const renderSocialSharing = (showShare?: boolean) => {
        if (!process.browser) {
            return <div />;
        }
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

    const breadcrumb = useMemo(() => {
        return (
            <div className="text-primary-light text-lg flex-center-y gap-2 mb-3  z-20">
                <div
                    className="flex-center-y gap-1 cursor-pointer font-semibold"
                    onClick={() => {
                        router.push(Path.home().href);
                    }}
                >
                    <Icon name="home" />
                    <div>{Messages.home}</div>
                </div>
                <div className="text-white"> • </div>
                <div
                    className="flex-center-y gap-1 cursor-pointer"
                    onClick={() => {
                        router.push(Path.blogs().href);
                    }}
                >
                    <div>{Messages.blogs}</div>
                </div>
            </div>
        );
    }, []);

    const renderBlogHeader = useMemo(() => {
        return (
            <BlogHeaderStyled className="w-100 relative h-[250px] md:h-[450px] flex flex-col justify-end bg-red-200">
                <div className="relative container z-10 ">
                    {breadcrumb}
                    <h1 className="z-10 h1 display-none md:block  text-primary-light">
                        {title}
                    </h1>
                    <h3 className="z-10 h3 md:hidden  text-primary-light text-center">
                        {title}
                    </h3>
                    <div
                        dangerouslySetInnerHTML={{ __html: shortDesc ?? "" }}
                        className="typography mt-3 text-gray-20 overflow-hidden max-h-[75px] md:max-h-[auto]"
                    />
                    <div className="flex flex-col-reverse gap-4 py-3 items-end md:flex-row md:items-center md:justify-between">
                        {renderSocialSharing(true)}
                        <BlogTimestamp createdAt={createdAt} />
                    </div>
                </div>
                <img
                    className="absolute h-100 w-100 left-0 right-0 bottom-0 top-0 z-0 blog-header__cover"
                    alt="blog_cover"
                    src={cover || "/images/information/cover_1.jpeg"}
                    style={{ objectFit: "cover" }}
                />
                <div className="bg-gradient-to-b from-gray-500  to-black to-100  ... h-[250px] md:h-[450px] z-11 opacity-50 absolute bottom-0 left-0 right-0" />
            </BlogHeaderStyled>
        );
    }, [cover, title, shortDesc]);

    const renderBlogContent = useMemo(() => {
        return (
            <div className="container mt-3 md:mt-5">
                <div
                    dangerouslySetInnerHTML={{ __html: fullDesc ?? "" }}
                    className="typography"
                />
                <div className="p-3 flex items-center justify-between bg-gray-950 rounded-md mt-3 md:mt-5">
                    <div className="flex-center-y w-50">
                        <Icon name="share" className="text-primary" />
                        <h5 className="mb-0 ml-3 post-detail__share-social-text text-primary">
                            {Messages.shareToYourFriend}
                        </h5>
                    </div>
                    {renderSocialSharing()}
                </div>
            </div>
        );
    }, [fullDesc]);
    return (
        <div className="relative z-10 bg-black">
            {renderBlogHeader}
            {renderBlogContent}
        </div>
    );
};

export default BlogDetail;

export const BlogTimestamp = ({ createdAt, className }: any) => {
    return (
        <div
            className={`text text-primary-light font-bold md:text-end ${className}`}
        >
            <span className="text-primary-light ">Pirate Mobile</span>
            <span className="text-white"> • </span>
            <span className="text-primary-light">Spain</span>
            <span className="text-white"> • </span>
            <span className="text-primary-light">
                {TimeUtils.convertMiliToDateWithFormat(createdAt, "MMM YYYY")}
            </span>
        </div>
    );
};

const BlogHeaderStyled = styled.div`
    .blog-header__cover {
        filter: "blur(3px)";
    }
`;
