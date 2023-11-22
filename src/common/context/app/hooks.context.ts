import { useContext } from "react";
import { AppStateContext, updateStateStorage } from "./app.context";
import { CurrencyType, ICurrency } from "@/common/constant/currency";

export const useUpdateCurrency = () => {
    const { userData, setUserData } = useContext(AppStateContext);
    const updateCurrency = (value: ICurrency) => {
        const saveData = { ...(userData || {}), currency: value };
        updateStateStorage("userData", saveData);
        setUserData(saveData);
    };

    return { updateCurrency };
};
