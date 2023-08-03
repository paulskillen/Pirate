import { ICountry } from "./location";
import { ProviderName } from "./provider";

export interface IBundleData {
    countries?: ICountry[];
    imageUrl?: string;
    roamingEnabled?: ICountry[];
    speed?: string[];
    [key: string]: any;
}

export interface IBundle {
    id?: string;
    provider: ProviderName;
    name: string;
    description?: string;
    dataAmount: any;
    duration: any;
    price: any;
    salePrice: number | null;
    bundleData?: IBundleData;
    updatedAt?: Date;
    createdAt?: Date;
    assignTo?: string | null;
}

export const isValidEsimIccId = (iccid?: string | null) => {
    return iccid && iccid.length === 19;
};
