import Path from "@/common/constant/path";
import ClassNames from "classnames";
import Image from "@/components/image/Image";
import AppLink from "@/components/link/AppLink";
import styled from "@emotion/styled";
import React from "react";
import { useRouter } from "next/router";

export interface IWPHeaderProps {
    [key: string]: any;
}

const WPHeader: React.FC<IWPHeaderProps> = ({ id }) => {
    const router = useRouter();
    const classItem =
        "wp-header__link p-3 rounded-full text-base sm:text-xl text-white";
    const { pathname, query } = router || {};
    const activeClass = (isActive?: boolean) => {
        return ClassNames({
            "rounded-full bg- text-gold-light font-semibold": isActive,
        });
    };

    return (
        <WPHeaderStyled className="flex items-center justify-between container pt-2">
            <AppLink href={Path.home().href}>
                <Image
                    useNextImg={false}
                    alt="logo"
                    className="wp-header__logo"
                    src="/images/logo/compact-logo.jpeg"
                />
            </AppLink>

            <div className="flex gap-5 wp-header__link-groups">
                <AppLink href={Path.blogs().href}>
                    <div
                        className={`${classItem} ${activeClass(
                            pathname === Path.blogs().href
                        )}`}
                    >
                        Blogs
                    </div>
                </AppLink>
                {/* <AppLink href={Path.affiliatePage().href}>
                    <div
                        className={`ml-2 ${classItem} ${activeClass(
                            pathname === Path.aboutUs().href
                        )}`}
                    >
                        About Us
                    </div>
                </AppLink> */}
                <AppLink href={Path.affiliatePage().href}>
                    <div
                        className={`${classItem} ${activeClass(
                            pathname === Path.home().href
                        )}`}
                    >
                        Affiliate Program
                    </div>
                </AppLink>
                <AppLink href={Path.home().href}>
                    <div
                        className={`wp-header__link text-xl text-white border p-3 ${activeClass(
                            pathname === Path.home().href
                        )}`}
                    >
                        Get Your Esims
                    </div>
                </AppLink>
            </div>
        </WPHeaderStyled>
    );
};

export default WPHeader;

const WPHeaderStyled = styled.div`
    position: relative;
    z-index: 10;
    /* border-bottom: 0.1px solid var(--color-gold); */
    .wp-header__logo {
        width: 150px;
        height: 150px;
    }

    @media (max-width: 576px) {
        display: flex;
        justify-content: center;
        background-color: red;
        .wp-header__link-groups {
            display: none;
        }
    }
`;
