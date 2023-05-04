import { PROVIDERS } from "@/common/constant/provider";
import Messages from "@/languages/Messages";
import { find } from "lodash";
import React, { useMemo } from "react";

export interface IProviderNameItemProps {
    providerId: string;
    className?: string;
}

const ProviderNameItem: React.FC<IProviderNameItemProps> = ({
    providerId,
    className,
}) => {
    const foundProvider = useMemo(() => {
        return find(PROVIDERS, (item) => item?.id === providerId);
    }, [providerId]);
    return (
        <div className={className}>
            {Messages?.[foundProvider?.label as keyof typeof Messages] as any}
        </div>
    );
};

export default ProviderNameItem;
