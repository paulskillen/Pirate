import Messages from "@/languages/Messages";
import { Button, InputTextSearch } from "d-react-components";
import React from "react";

export interface IListCountryPageProps {
    [key: string]: any;
}

const ListCountryPage: React.FC<IListCountryPageProps> = ({ id }) => {
    return (
        <div>
            <div className="flex-row items-center">
                <InputTextSearch />
                <Button>{Messages.cancel}</Button>
            </div>
        </div>
    );
};

export default ListCountryPage;
