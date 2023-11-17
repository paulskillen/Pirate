import { useContext } from "react";
import { AppStateContext, updateStateContext } from "./app-context";

export const useUpdateCurrency = () => {
    const { userData, setUserData } = useContext(AppStateContext);

    const updateCurrency = (value: string) => {
        const saveData = { ...(userData || {}), currency: value };
        setUserData(saveData);
        updateStateContext("userData", userData);
    };

    return { updateCurrency };
};
