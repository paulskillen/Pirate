import { ProviderName } from "./provider";

export interface IBundle {
    id?: string;
    provider: ProviderName;
    name: string;
    description?: string;
    dataAmount: any;
    duration: any;
    price: any;
    salePrice: number | null;
    bundleData?: any;
    updatedAt?: Date;
    createdAt?: Date;
}
