import ListCountryPage from "@/container/list-country/ListCountryPage";
import Messages from "@/languages/Messages";
import { Button, InputTextSearch } from "d-react-components";
import React from "react";

export interface IListCountryProps {
    [key: string]: any;
}

const ListCountry: React.FC<IListCountryProps> = ({ id }) => {
    return <ListCountryPage />;
};

export default ListCountry;
