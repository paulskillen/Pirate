import Path from "@/common/constant/path";
import Messages from "@/languages/Messages";
import { signOutAction } from "@/store/auth/authActions";
import { useAuthProfile } from "@/store/auth/authHook";
import styled from "@emotion/styled";
import { Avatar, Button } from "d-react-components";
import { signOut, useSession } from "next-auth/react";
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
        <ProfilePageStyled className="flex flex-col items-center justify-start w-screen h-screen relative text-white">
            <div className="profile-page__header w-full bg-primary">
                <div
                    className={`flex flex-row items-center justify-between py-2 px-4   w-full`}
                >
                    <Button
                        onClick={() => router.push(Path.home().href)}
                        variant="trans"
                        iconName="arrow_back_ios_new"
                        className="px-0"
                        color="light"
                    />
                    <h5 className={`font-semibold text-white `}>
                        {Messages.profile}
                    </h5>
                    <div />
                </div>
            </div>
            <div className="profile-page__avatar-wrapper p-2 bg-black rounded-pill">
                <Avatar
                    src={avatar ?? ""}
                    className="profile-page__avatar"
                    text={firstName}
                    size="large"
                />
            </div>
            <div className="w-full overflow-y-scroll flex flex-col items-center pb-5">
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
                <div className="profile-page__copy-right small text-center mt-2">
                    © 2023 Pirate Mobile Co., Ltd. All Rights Reserved.
                </div>
            </div>
        </ProfilePageStyled>
    );
};

export default ProfilePage;

const ProfilePageStyled = styled.div`
    .profile-page__header {
        min-height: 20%;
    }
    .profile-page__avatar-wrapper {
        margin-top: -50px;
    }
    .profile-page__copy-right {
        max-width: 50%;
    }
`;
