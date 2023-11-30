import { IBlog } from "@/common/interface/blog";
import Messages from "@/languages/Messages";
import { Icon, TimeUtils } from "d-react-components";
import React, { Fragment, useMemo } from "react";

export interface IBlogDetailProps {
    blog: IBlog;
}

const BlogDetail: React.FC<IBlogDetailProps> = ({ blog }) => {
    const { fullDesc, shortDesc, createdAt, cover, title } = blog || {};

    const renderBlogHeader = useMemo(() => {
        return (
            <div className="w-100 relative h-[200px] md:h-[450px] flex flex-col justify-end bg-red-200">
                <div className="relative container z-10 ">
                    <h1 className="z-10 h1  text-white">{title}</h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: shortDesc ?? "" }}
                        className="typography "
                    />
                    <div className="text text-white font-bold text-end mb-3">
                        {TimeUtils.convertMiliToDateTime(createdAt)}
                    </div>
                </div>
                <img
                    className="absolute h-100 w-100 left-0 right-0 bottom-0 top-0 z-0"
                    alt="blog_cover"
                    src={cover || "/images/information/cover_1.jpeg"}
                    style={{ objectFit: "cover" }}
                />
            </div>
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
                    <div className="card p-3 mt-3 post-detail__share-friend">
                        <div className="flex-center-y w-50">
                            <Icon name="share" className="text-primary" />
                            <h5 className="mb-0 ml-3 post-detail__share-social-text">
                                {Messages.shareToYourFriend}
                            </h5>
                        </div>
                        {/* <div className="post-detail__share-friend-group">
                            {renderSocialSharing()}
                        </div> */}
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
