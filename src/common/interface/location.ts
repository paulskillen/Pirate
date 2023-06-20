export enum CountryRegion {
    Middle_East = "Middle East",
    Asia = "Asia",
    Africa = "Africa",
    Europe = "Europe",
    Oceania = "Oceania",
    South_America = "South America",
    North_America = "North America",
    Global = "Global",
}

export const REGION = {
    northAmerica: CountryRegion.North_America,
    southAmerica: CountryRegion.South_America,
    middleEast: CountryRegion.Middle_East,
    asia: CountryRegion.Asia,
    africa: CountryRegion.Africa,
    europe: CountryRegion.Europe,
    oceania: CountryRegion.Oceania,
    global: CountryRegion.Global,
};

export const REGIONS = [
    {
        id: REGION.europe,
        label: "europe",
    },
    {
        id: REGION.asia,
        label: "asia",
    },
    {
        id: REGION.northAmerica,
        label: "northAmerica",
    },
    {
        id: REGION.southAmerica,
        label: "southAmerica",
    },
    {
        id: REGION.middleEast,
        label: "middleEast",
    },

    {
        id: REGION.africa,
        label: "africa",
    },

    {
        id: REGION.oceania,
        label: "oceania",
    },
    {
        id: REGION.global,
        label: "global",
    },
];

export interface ICountry {
    id?: string;
    name?: string;
    isoAlpha2?: string;
    isoAlpha3?: string;
    isoNumeric?: string;
    currency?: string;
    flag?: string;
    iso?: string;
    region?: string;
}
