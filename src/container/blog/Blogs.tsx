import BlogApi from "@/apis/blog/BlogApi";
import { IBlog } from "@/common/interface/blog";
import { Loading } from "d-react-components";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Path from "@/common/constant/path";
import { BlogTimestamp } from "./BlogDetail";

export interface IBlogsProps {
    [key: string]: any;
}

const Blogs: React.FC<IBlogsProps> = ({ id }) => {
    const [listBlogs, setListBlogs] = useState<IBlog[]>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        loadBlogsData();
    }, []);

    const loadBlogsData = async () => {
        setLoading(true);
        const res = await BlogApi.list({ page: 1, limit: 20 });
        setListBlogs(res?.data?.data?.data ?? []);
        setLoading(false);
    };

    const loadingView = (
        <div>
            <Loading />
        </div>
    );
    if (!listBlogs?.length) {
        if (loading) {
            return loadingView;
        }
        return (
            <div className="container py-[100px]">
                <h1 className="text-white text-center">404 - Page Not Found</h1>
            </div>
        );
    }
    return (
        <div className="container py-[100px]">
            <h1 className="text-primary mb-5 text-center">Blogs</h1>
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
                <Masonry className="" gutter="8px">
                    {listBlogs.map((blog, i) => (
                        <BlogItem
                            key={`${blog?.id}_${i}`}
                            blog={blog}
                            index={i}
                        />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
};

export default Blogs;

export interface IBlogItemProps {
    blog: IBlog;
    index: number;
}

const BlogItem: React.FC<IBlogItemProps> = ({ blog }) => {
    const router = useRouter();
    const { thumbnail, title, shortDesc, createdAt } = blog || {};
    return (
        <div
            className="w-100 cursor-pointer rounded-sm relative"
            onClick={() => {
                router.push(Path.blogDetail(blog).as!);
            }}
        >
            <img
                className="rounded-sm"
                src={thumbnail}
                style={{ width: "100%", display: "block" }}
                alt="blog_thumbnail"
            />
            <div className="absolute z-30 bottom-0 px-3 py-3">
                <h3 className=" text-primary-light pb-2">{title}</h3>
                <BlogTimestamp createdAt={createdAt} className="text-start pb-3" />
                <div
                    dangerouslySetInnerHTML={{ __html: shortDesc! }}
                    className="max-h-[50px] overflow-hidden text-ellipsis typography"
                />
            </div>
            <div className="bg-gradient-to-b from-transparent from-[30%] via-[#747474] via-[50%]   to-black opacity-50 absolute z-20 top-0 bottom-0  left-0 right-0" />
        </div>
    );
};
