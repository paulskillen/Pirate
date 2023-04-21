import Path from "@/common/constant/path";
import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";
import { signOutAction } from "@/store/auth/authActions";
import { Avatar, Button } from "d-react-components";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import MenuItem from "../shared/navigation/MenuItem";

export interface IProfilePageProps {
    [key: string]: any;
}

const MENUS = [
    {
        id: "orderHistory",
        label: "orderHistory",
        icon: "history",
        path: Path.orderHistory().href,
    },
    {
        id: "setting",
        label: "setting",
        icon: "settings",
        path: Path.orderHistory().href,
    },
    {
        id: "helpCenter",
        label: "helpCenter",
        icon: "settings_phone",
        path: Path.orderHistory().href,
    },
    {
        id: "promos",
        label: "promos",
        icon: "query_stats",
        path: Path.orderHistory().href,
    },
    {
        id: "about",
        label: "about",
        icon: "info",
        path: Path.orderHistory().href,
    },
];

const ProfilePage: React.FC<IProfilePageProps> = ({ id }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data } = useSession();

    return (
        <div className="flex flex-col items-center justify-start w-screen h-screen relative text-white">
            <Avatar src={data?.user?.image ?? ""} className="mt-5" />
            <div className="mt-3">{data?.user?.email}</div>
            <div className="mt-3">{data?.user?.name}</div>
            <div className="px-4 w-full z-20">
                {MENUS.map((item, index) => {
                    return <MenuItem key={item?.id} menu={item} />;
                })}
            </div>

            <Button
                className="z-10 mt-4"
                onClick={() => {
                    signOut();
                    dispatch(signOutAction());
                }}
                color="light"
                variant="trans"
                size="large"
                iconName="power_settings_new"
            >
                {Messages.signOut}
            </Button>
        </div>
    );
};

export default ProfilePage;
