import { COLOR_DARKEN } from "@/common/constant/app-style";
import { AppStateContext } from "@/common/context/app/app-context";
import InputSearch from "@/components/input/InputSearch";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
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
import { Element, Link } from "react-scroll";
import { useScroll, useSessionStorage } from "react-use";
import CountryItem from "./CountryItem";

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
