import ListCountryPage from "@/container/list-country/ListCountryPage";
import React from "react";

export interface IListCountryProps {
    [key: string]: any;
}

const ListCountry: React.FC<IListCountryProps> = ({ id }) => {
    return <ListCountryPage />;
};

export default ListCountry;
