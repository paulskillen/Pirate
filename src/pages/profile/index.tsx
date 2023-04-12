import ProfilePage from "@/container/profile/ProfilePage";
import { LayoutAuth } from "@/container/shared/layout/Layout";
import React from "react";

export interface IProfileProps {
    [key: string]: any;
}

const Profile: React.FC<IProfileProps> = ({ id }) => {
    return <ProfilePage />;
};

export default Profile;

//@ts-ignore
Profile.Layout = LayoutAuth;
