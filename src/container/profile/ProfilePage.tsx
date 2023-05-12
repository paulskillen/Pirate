import Path from "@/common/constant/path";
import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";
import { signOutAction } from "@/store/auth/authActions";
import { useAuthProfile } from "@/store/auth/authHook";
import { Avatar, Button } from "d-react-components";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import LayoutHeader from "../shared/layout/LayoutHeader";
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
        path: Path.setting().href,
    },
    {
        id: "helpCenter",
        label: "helpCenter",
        icon: "settings_phone",
        path: Path.helpCenter().href,
    },
    {
        id: "promos",
        label: "promos",
        icon: "query_stats",
        path: Path.aboutUs().href,
    },
    {
        id: "about",
        label: "about",
        icon: "info",
        path: Path.aboutUs().href,
    },
];

const ProfilePage: React.FC<IProfilePageProps> = ({ id }) => {
    const router = useRouter();
    const { avatar, email, firstName, lastName } = useAuthProfile() || {};
    const dispatch = useDispatch();
    const { data } = useSession();

    return (
        <div className="flex flex-col items-center justify-start w-screen h-screen relative text-white">
            <LayoutHeader onBackClick={() => router.push(Path.home().href)} />
            <Avatar src={avatar ?? ""} className="mt-5" text={firstName} />
            <div className="mt-3">{email}</div>
            <div className="mt-3">{`${firstName} ${lastName}`}</div>
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
