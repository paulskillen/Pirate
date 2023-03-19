import { useRouter } from "next/router";
import { useMemo } from "react";

export const useLocale = (): string => {
    const router = useRouter();
    return useMemo(() => {
        return router.locale ?? (router.defaultLocale as string);
    }, [router.locale]);
};
