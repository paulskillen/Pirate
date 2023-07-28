import Path from "@/common/constant/path";
import { Element, Link } from "react-scroll";
import { AppStateContext } from "@/common/context/app/app-context";
import { ICountry } from "@/common/interface/location";
import Image from "@/components/image/Image";
import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";
import ClassNames from "classnames";
import { Button } from "d-react-components";
import { forEach, map } from "lodash";
import { useRouter } from "next/router";
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import { useScroll, useSessionStorage } from "react-use";
import styled from "@emotion/styled";
import { COLOR_DARKEN, COLOR_GOLD } from "@/common/constant/app-style";
import InputSearch from "@/components/input/InputSearch";
import Icon from "@/components/icon/Icon";

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
            <div className="flex flex-col list-country-page__alphabet z-50 pr-5">
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
            <div className="flex flex-row items-center list-country-page__header bg-black pt-3 pb-2 px-3">
                <InputSearch
                    className="w-full"
                    onChange={(e: any) => {
                        setTextSearch(e?.target?.value);
                    }}
                    value={textSearch}
                    placeholder={Messages.selectDestination}
                />
                <Button
                    onClick={() => {
                        return router.back();
                    }}
                    variant="outline"
                    content="Back"
                    className="page-header__back-button text-gold pl-4 pr-4 ml-3"
                />
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

export const CountryItem = (props: {
    country: ICountry;
    hoverColor?: any;
    loading?: boolean;
}) => {
    const { country, hoverColor = true, loading } = props;
    const { name, flag, iso } = country || {};
    if (loading) {
        return <CountrySkeleton />;
    }
    return (
        <AppLink href={Path.bundleByCountry(country?.iso ?? "")} id={iso}>
            <CountryListItemStyle
                className={`flex flex-row items-center text-gray-300 pt-3 pb-3 pl-3 ${ClassNames(
                    { "hover:bg-gold-trans": hoverColor }
                )}`}
                {...props}
            >
                <Image
                    className="w-12 rounded border"
                    alt="flag"
                    src={`data:image/png;base64, ${flag}`}
                />
                <div className="text-base font-semibold ml-3 max-w-xs ">
                    {name}
                </div>
            </CountryListItemStyle>
        </AppLink>
    );
};

export const CountrySkeleton = React.memo(function CountrySkeletonMemo() {
    return (
        <div
            role="status"
            className="animate-pulse flex items-center w-full py-3"
        >
            <div className="flex items-center justify-center w-20 h-16 bg-gray-400 rounded sm:w-52 dark:bg-gray-700 mx-3">
                <svg
                    className="w-10 h-10 text-gray-300 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>
            <div className="w-full pr-3">
                <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-48 mb-3"></div>
                <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
        </div>
    );
});

const ListCountryPageStyle = styled.div`
    .list-country-page__header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }

    .page-header__back-button {
        background-color: ${COLOR_DARKEN} !important;
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

const CountryListItemStyle = styled.div``;
