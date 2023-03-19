import Path from "@/common/constant/navigation/path";
import { AppStateContext } from "@/common/context/app/app-context";
import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";
import { Button, InputTextSearch } from "d-react-components";
import { map } from "lodash";
import { useRouter } from "next/router";
import React, { useContext } from "react";

export interface IListCountryPageProps {
    [key: string]: any;
}

const ListCountryPage: React.FC<IListCountryPageProps> = ({ id }) => {
    const router = useRouter();
    const { countryList } = useContext(AppStateContext);
    return (
        <div className="bg-primary w-full h-full px-4 pt-4 ">
            <div className="flex flex-row items-center">
                <InputTextSearch className="bg-light" />
                <Button
                    variant="trans"
                    color="light"
                    onClick={() => router.back()}
                >
                    {Messages.cancel}
                </Button>
            </div>
            <div className="overflow-y-auto">
                {map(countryList, (item) => {
                    return <CountryItem country={item} />;
                })}
            </div>
        </div>
    );
};

export default ListCountryPage;

const CountryItem = ({ country }: any) => {
    const { name } = country || {};
    return (
        <AppLink href={Path.bundleByCountry(country?.isoAlpha2)}>
            <div className="flex flex-row items-center">
                <div>{name}</div>
            </div>
        </AppLink>
    );
};
