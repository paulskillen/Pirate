import Path from "@/common/constant/path";
import Icon from "@/components/icon/Icon";
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
            <div className="bg-gray-600 h-[1px] w-full" />
            <div className="w-100 flex flex-col sm:flex-row justify-between items-center py-5">
                <div className="flex items-center gap-3 text-lg">
                    <div>Pirate Mobile 2023 All rights reserved</div>
                    <AppLink href={Path.policy().href}>
                        <div>{Messages.privacyPolicy}</div>
                    </AppLink>
                    <AppLink href={Path.termConditions().href}>
                        <div>{Messages.termOfUse}</div>
                    </AppLink>
                </div>
                <div className="flex items-center gap-10">
                    <AppLink>
                        <Icon icon="facebook" />
                    </AppLink>
                    <AppLink>
                        <Icon icon="instagram" />
                    </AppLink>
                    <AppLink>
                        <Icon icon="linkedin" />
                    </AppLink>
                </div>
            </div>
        </SiteFooterStyled>
    );
};

export default SiteFooter;

const SiteFooterStyled = styled.div``;
