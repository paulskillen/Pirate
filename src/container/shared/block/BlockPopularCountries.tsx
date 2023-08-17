import Path from "@/common/constant/path";
import { ICountry } from "@/common/interface/location";
import Image from "@/components/image/Image";
import AppLink from "@/components/link/AppLink";
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
            {dataSource?.length && (
                <div className="flex-center-y overflow-y-scroll scroll-hide-indicator gap-3">
                    {map(dataSource, (item, index) => {
                        const { name, flag, iso } = item || {};
                        return (
                            <AppLink
                                className="min-w-fit"
                                href={Path.bundleByCountry(iso ?? "")}
                                id={`${iso}_${index}`}
                            >
                                <div className="flex flex-row items-center mt-1 bg-black border border-gold px-2 py-2 rounded-full min-w-[90px]">
                                    <Image
                                        className="w-8 h-8 rounded-full border border-gold"
                                        alt="flag"
                                        src={`data:image/png;base64, ${flag}`}
                                    />
                                    <div className="small ml-2 text-nowrap">
                                        {name}
                                    </div>
                                </div>
                            </AppLink>
                        );
                    })}
                </div>
            )}
        </BlockPopularCountriesStyled>
    );
};

export default BlockPopularCountries;

const BlockPopularCountriesStyled = styled.div``;
