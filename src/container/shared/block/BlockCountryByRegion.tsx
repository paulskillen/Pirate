import { AppStateContext } from "@/common/context/app/app-context";
import { CountryRegion } from "@/common/interface/location";
import styled from "@emotion/styled";
import { find, isEmpty, map } from "lodash";
import React, { useContext, useMemo } from "react";

export interface IBlockCountryByRegionProps {
    region: CountryRegion;
}

const BlockCountryByRegion: React.FC<IBlockCountryByRegionProps> = ({
    region,
}) => {
    const { metaData } = useContext(AppStateContext);
    const { countryByRegion } = metaData || {};
    const countries = useMemo(() => {
        return find(countryByRegion, (v, k) => {
            return k === region;
        });
    }, [region, countryByRegion]);
    if (isEmpty(countries)) {
        return null;
    }

    return (
        <BlockCountryByRegionStyled>
            <div>{region}</div>
            <div className="flex-center-y overflow-x-scroll">
                {map(countries, (country) => {
                    return <div>{country?.name}</div>;
                })}
            </div>
        </BlockCountryByRegionStyled>
    );
};

export default BlockCountryByRegion;

const BlockCountryByRegionStyled = styled.div``;
