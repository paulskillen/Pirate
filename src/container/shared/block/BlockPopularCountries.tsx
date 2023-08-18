import Path from "@/common/constant/path";
import { ICountry } from "@/common/interface/location";
import Image from "@/components/image/Image";
import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { map } from "lodash";
import React from "react";

export interface IBlockPopularCountriesProps {
    dataSource: ICountry[];
    label?: string;
    className?: string;
}

const BlockPopularCountries: React.FC<IBlockPopularCountriesProps> = ({
    dataSource,
    label,
    className,
}) => {
    return (
        <BlockPopularCountriesStyled className={className}>
            {label && <h5 className="mb-4 text-white">{label}</h5>}
            {!!dataSource?.length && (
                <div className="flex items-center overflow-y-scroll scroll-hide-indicator gap-3 md:grid grid-flow-row grid-cols-12 md:gap-6">
                    {map(dataSource, (item, index) => {
                        const { name, flag, iso } = item || {};
                        return (
                            <AppLink
                                className="min-w-fit md:col-span-3"
                                href={Path.bundleByCountry(iso ?? "")}
                                id={`${iso}_${index}`}
                            >
                                <div className="flex flex-row items-center mt-1 bg-black border border-gold px-2 py-2 rounded-full min-w-[90px] hover:bg-gold-trans ">
                                    <Image
                                        className="w-8 h-8 rounded-full border border-gold"
                                        alt="flag"
                                        src={`data:image/png;base64, ${flag}`}
                                    />
                                    <div className="small ml-2 text-nowrap text-gold hover:text-gold-light">
                                        {name}
                                    </div>
                                </div>
                            </AppLink>
                        );
                    })}
                    <AppLink
                        className="min-w-fit md:col-span-3"
                        href={Path.listCountry().href}
                    >
                        <div className=" bg-black px-2 py-2 rounded-full min-w-[90px] hover:text-gold-light text-center underline ">
                            {Messages.seeAllCountries}
                        </div>
                    </AppLink>
                </div>
            )}
        </BlockPopularCountriesStyled>
    );
};

export default BlockPopularCountries;

const BlockPopularCountriesStyled = styled.div``;
