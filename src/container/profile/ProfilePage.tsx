import Path from "@/common/constant/path";
import AppLink from "@/components/link/AppLink";
import Messages from "@/languages/Messages";
import { signOutAction } from "@/store/auth/authActions";
import { Avatar, Button } from "d-react-components";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

export interface IProfilePageProps {
    [key: string]: any;
}

const ProfilePage: React.FC<IProfilePageProps> = ({ id }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data } = useSession();

    return (
        <div className="flex flex-col items-center justify-start w-screen h-screen relative text-white">
            <Avatar src={data?.user?.image ?? ""} className="mt-5" />
            <div className="mt-3">{data?.user?.email}</div>
            <div className="mt-3">{data?.user?.name}</div>
            <AppLink href={Path.orderHistory().href}>
                <div className="bg-gold p-2 rounded-full">
                    {Messages.orderHistory}
                </div>
            </AppLink>
            <Button
                onClick={() => {
                    signOut();
                    dispatch(signOutAction());
                }}
                color="secondary"
                variant="trans"
            >
                {Messages.signOut}
            </Button>
        </div>
    );
};

export default ProfilePage;
