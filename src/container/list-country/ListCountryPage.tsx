import Path from "@/common/constant/path";
import { Element, Link } from "react-scroll";
import { AppStateContext } from "@/common/context/app/app-context";
import { ICountry } from "@/common/interface/location";
import Image from "@/components/image/Image";
import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";
import ClassNames from "classnames";
import { Button, InputTextSearch } from "d-react-components";
import { forEach, map } from "lodash";
import { useRouter } from "next/router";
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useScroll, useSessionStorage } from "react-use";
import styled from "@emotion/styled";

export interface IListCountryPageProps {
    [key: string]: any;
}

interface IAlphabetItem {
    id: string;
    label: string;
    countryId: string;
}

const scrollKey = "scrollKey";

const ListCountryPage: React.FC<IListCountryPageProps> = ({ id }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { x, y } = useScroll(scrollRef);
    const { metaData } = useContext(AppStateContext);

    const [value, setValue] = useSessionStorage(scrollKey, 0);
    const [textSearch, setTextSearch] = useState("");
    const [activeAlphabet, setActiveAlphabet] = useState<any>();
    const { countryList = [] } = metaData || {};
    const alphabetList: IAlphabetItem[] = useMemo(() => {
        const res = new Map();
        forEach(countryList, (item) => {
            const { name, iso } = item || {};
            const char = name?.charAt(0);
            if (!res.has(char)) {
                res.set(char, { id: iso, label: char, countryId: id });
            }
        });
        return Array.from(res.values());
    }, [countryList]);
    const searchCountry = useCallback((text: string, country: any): boolean => {
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
    }, []);

    useEffect(() => {
        if (value && value > 0) {
            scrollRef.current && scrollRef.current.scroll(0, value);
        }
    }, []);

    useEffect(() => {
        setValue(y);
    }, [y]);

    const renderAlphabetList = () => {
        return (
            <div className="flex flex-col list-country-page__alphabet z-50 pr-5 pl-3">
                {map(alphabetList, (character) => {
                    const { id, label, countryId } = character || {};
                    return (
                        <Link
                            smooth
                            spy
                            to={id}
                            className={ClassNames(
                                "pt-1 text-base list-country-page__alphabet-item hover-pointer",
                                {
                                    "list-country-page__alphabet-item--active":
                                        activeAlphabet?.id === character?.id,
                                }
                            )}
                            activeClass="list-country-page__alphabet-item--active"
                            containerId="list-country-page"
                            duration={500}
                            onSetActive={() => {
                                setActiveAlphabet(character);
                            }}
                            offset={-150}
                        >
                            {character?.label}
                        </Link>
                    );
                })}
            </div>
        );
    };

    return (
        <ListCountryPageStyle
            className="bg-transparent h-screen z-10 px-4 pt-4 relative overflow-y-auto hide-scroll-bar-y"
            ref={scrollRef}
            id="list-country-page"
        >
            <div className="flex flex-row items-center list-country-page__header bg-black pt-2 px-3">
                <InputTextSearch
                    className="bg-light"
                    onChange={(e: any) => {
                        setTextSearch(e?.target?.value);
                    }}
                    placeholder={Messages.searchCountryBy}
                />
                <Button
                    variant="trans"
                    color="light"
                    onClick={() => router.back()}
                >
                    {Messages.cancel}
                </Button>
            </div>
            <div className="mt-20" ref={listRef}>
                {map(countryList, (item) => {
                    if (textSearch) {
                        const checked = searchCountry(textSearch, item);
                        if (!checked) {
                            return null;
                        }
                    }
                    return (
                        <Element
                            name={`${item?.iso ?? ""}`}
                            id={item?.iso ?? ""}
                        >
                            <CountryItem key={item?.id} country={item} />
                        </Element>
                    );
                })}
                {renderAlphabetList()}
                <div className="h-32 w-100" />
            </div>
        </ListCountryPageStyle>
    );
};

export default ListCountryPage;

export const CountryItem = ({ country }: { country: ICountry }) => {
    const { name, flag, iso } = country || {};
    return (
        <AppLink href={Path.bundleByCountry(country?.iso ?? "")} id={iso}>
            <div className="flex flex-row items-center text-gray-300 mt-3 pb-3">
                <Image
                    className="w-12 rounded border"
                    alt="flag"
                    src={`data:image/png;base64, ${flag}`}
                />
                <div className="text-base font-semibold ml-3 max-w-xs ">
                    {name}
                </div>
            </div>
        </AppLink>
    );
};

const ListCountryPageStyle = styled.div`
    .list-country-page__header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }

    .list-country-page__alphabet {
        position: fixed;
        right: 0px;
        top: 80px;
        z-index: 999;
        pointer-events: all;
        .list-country-page__alphabet-item {
            text-align: center;
            transition: 0.5s all linear;
            color: var(--color-gold) !important;
            width: 25px;
            height: 25px;
            &:active {
                font-weight: bold;
            }
            &:hover {
                font-weight: bold;
            }
        }
        .list-country-page__alphabet-item--active {
            color: white !important;
            border-radius: 999px;
            background-color: var(--color-gold);
            text-align: center;
        }
    }
`;
