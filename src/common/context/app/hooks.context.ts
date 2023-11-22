import { useContext } from "react";
import { AppStateContext, updateStateStorage } from "./app.context";

export const useUpdateCurrency = () => {
    const { userData, setUserData } = useContext(AppStateContext);

    const updateCurrency = (value: string) => {
        const saveData = { ...(userData || {}), currency: value };
        setUserData(saveData);
        updateStateStorage("userData", userData);
    };

    return { updateCurrency };
};
