/* eslint-disable react/no-unescaped-entities */
import Path from "@/common/constant/path";
import Icon from "@/components/icon/Icon";
import Image from "@/components/image/Image";
import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import React from "react";

export interface ISiteFooterProps {
    [key: string]: any;
}

const SiteFooter: React.FC<ISiteFooterProps> = ({ id }) => {
    return (
        <SiteFooterStyled className="text-white container relative z-10 mt-5">
            <div className="flex flex-col sm:flex-row sm:justify-between mb-5 ">
                <div className="flex-1 sm:pr-20 max-sm:flex flex-col items-center max-sm:w-full">
                    <Image
                        alt="logo"
                        className="site-footer__logo"
                        src="/images/logo/logo.png"
                        nextImageProps={{ width: 150, height: 150 }}
                    />
                    <h5 className="my-4 text-white">PIRATE MOBILE LIMITED</h5>
                    <div className="my-4 max-sm:text-center">
                        Pirate Mobile provides eSIM data packages to ensure
                        wherever you go, you are always connected.
                    </div>
                    <div className="bg-gold-light h-[2px] w-full max-w-[100px]" />
                </div>
                <div className="flex flex-col items-center md:items-start flex-1">
                    <h5 className="text-white max-sm:hidden">CONTACT US</h5>

                    <div className="flex flex-row my-4">
                        <Icon
                            className="mx-3 text-gold-light"
                            icon="email"
                            useIconSet="fontisto"
                        />
                        <AppLink href="mailto:info@piratemobile.gg">
                            <div className="text-gold-light">
                                info@piratemobile.gg
                            </div>
                        </AppLink>
                    </div>
                    {/* <div className="flex flex-row my-4">
                        <Icon
                            className="mx-4"
                            icon="map"
                            size={30}
                            useIconSet="fontisto"
                        />
                        <div>
                            Avenue House St. Julian's Avenue St Peter Port
                            Guernsey Channel Islands GY1 1WA
                        </div>
                    </div> */}
                </div>
            </div>

            <div className="bg-gold-trans h-[1px] w-full" />
            <div className="w-100 flex flex-col sm:flex-row justify-between items-center py-5">
                <div className="flex flex-col sm:flex-row items-center gap-3 text-lg">
                    <div className="text-gold">
                        © 2023, eSIM Powered by Pirate Mobile
                    </div>
                    <AppLink href={Path.policy().href}>
                        <div>{Messages.privacyPolicy}</div>
                    </AppLink>
                    <AppLink href={Path.termConditions().href}>
                        <div>{Messages.termOfUse}</div>
                    </AppLink>
                </div>
                <div className="flex items-center gap-10 mt-[1rem] sm:mt-0">
                    <AppLink
                        href={
                            "https://www.facebook.com/piratemobileofficial?mibextid=LQQJ4d"
                        }
                        target="_blank"
                    >
                        <Icon className="text-gold-light" icon="facebook" />
                    </AppLink>
                    <AppLink
                        href={
                            "https://instagram.com/piratemobileofficial?igshid=OGQ5ZDc2ODk2ZA=="
                        }
                        target="_blank"
                    >
                        <Icon className="text-gold-light" icon="instagram" />
                    </AppLink>
                    <AppLink
                        href={"https://www.linkedin.com/company/pirate-mobile/"}
                        target="_blank"
                    >
                        <Icon className="text-gold-light" icon="linkedin" />
                    </AppLink>
                </div>
                <div className="block md:hidden h-[100px]" />
            </div>
        </SiteFooterStyled>
    );
};

export default SiteFooter;

const SiteFooterStyled = styled.div``;
