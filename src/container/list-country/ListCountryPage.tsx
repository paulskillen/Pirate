import Path from "@/common/constant/path";
import { AppStateContext } from "@/common/context/app/app-context";
import Image from "@/components/image/Image";
import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";
import { Button, InputTextSearch } from "d-react-components";
import { forEach, map } from "lodash";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

export interface IListCountryPageProps {
    [key: string]: any;
}

const ListCountryPage: React.FC<IListCountryPageProps> = ({ id }) => {
    const router = useRouter();
    const [textSearch, setTextSearch] = useState("");
    const { countryList } = useContext(AppStateContext);

    const searchCountry = (text: string, coutry: any): boolean => {
        const keyToSearch = ["name"];
        let found = false;
        forEach(keyToSearch, (key) => {
            const value = coutry?.[key];
            if (
                value &&
                value?.toUpperCase?.()?.indexOf(text?.toUpperCase()) !== -1
            ) {
                found = true;
            }
        });
        return found;
    };

    return (
        <div className="bg-primary px-4 pt-4 ">
            <div className="flex flex-row items-center">
                <InputTextSearch
                    className="bg-light"
                    onChange={(e: any) => {
                        console.log(
                            "🚀 >>>>>> file: ListCountryPage.tsx:63 >>>>>> e:",
                            e
                        );
                        setTextSearch(e?.target?.value);
                    }}
                />
                <Button
                    variant="trans"
                    color="light"
                    onClick={() => router.back()}
                >
                    {Messages.cancel}
                </Button>
            </div>
            <div className="overflow-y-auto h-screen mt-3">
                {map(countryList, (item) => {
                    if (textSearch) {
                        const checked = searchCountry(textSearch, item);
                        if (!checked) {
                            return null;
                        }
                    }
                    return <CountryItem country={item} />;
                })}
            </div>
        </div>
    );
};

export default ListCountryPage;

const CountryItem = ({ country }: any) => {
    const { name, flag } = country || {};
    return (
        <AppLink href={Path.bundleByCountry(country?.isoAlpha2)}>
            <div className="flex flex-row items-center text-white">
                {/* <Image src={flag} /> */}
                <div>{name}</div>
            </div>
        </AppLink>
    );
};
