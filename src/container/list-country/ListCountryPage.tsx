import Path from "@/common/constant/path";
import { AppStateContext } from "@/common/context/app/app-context";
import Image from "@/components/image/Image";
import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";
import { Button, InputTextSearch } from "d-react-components";
import { forEach, map } from "lodash";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useScroll, useSessionStorage } from "react-use";

export interface IListCountryPageProps {
    [key: string]: any;
}

const scrollKey = "scrollKey";

const ListCountryPage: React.FC<IListCountryPageProps> = ({ id }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const { x, y } = useScroll(scrollRef);
    const [value, setValue] = useSessionStorage(scrollKey, 0);
    const router = useRouter();
    const [textSearch, setTextSearch] = useState("");
    const { metaData } = useContext(AppStateContext);
    const { countryList = [] } = metaData || {};

    const searchCountry = (text: string, country: any): boolean => {
        const keyToSearch = ["name"];
        let found = false;
        forEach(keyToSearch, (key) => {
            const value = country?.[key];
            if (
                value &&
                value?.toUpperCase?.()?.indexOf(text?.toUpperCase()) !== -1
            ) {
                found = true;
            }
        });
        return found;
    };

    useEffect(() => {
        if (value && value > 0) {
            scrollRef.current && scrollRef.current.scroll(0, value);
        }
    }, []);

    useEffect(() => {
        setValue(y);
    }, [y]);

    return (
        <div className="bg-transparent z-10 px-4 pt-4 relative ">
            <div className="flex flex-row items-center">
                <InputTextSearch
                    className="bg-light"
                    onChange={(e: any) => {
                        setTextSearch(e?.target?.value);
                    }}
                    placeholder={Messages.search}
                />
                <Button
                    variant="trans"
                    color="light"
                    onClick={() => router.back()}
                >
                    {Messages.cancel}
                </Button>
            </div>
            <div className="overflow-y-auto h-screen mt-3" ref={scrollRef}>
                {map(countryList, (item) => {
                    if (textSearch) {
                        const checked = searchCountry(textSearch, item);
                        if (!checked) {
                            return null;
                        }
                    }
                    return <CountryItem key={item?.id} country={item} />;
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
            <div className="flex flex-row items-center text-white w-full mt-4 pb-3">
                <Image
                    className="w-12 rounded border"
                    alt="flag"
                    src={`data:image/png;base64, ${flag}`}
                />
                <div className="text-xl font-semibold ml-3 ">{name}</div>
            </div>
        </AppLink>
    );
};
