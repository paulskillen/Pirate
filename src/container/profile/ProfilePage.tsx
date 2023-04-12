import Messages from "@/languages/Messages";
import { Avatar, Button } from "d-react-components";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export interface IProfilePageProps {
    [key: string]: any;
}

const ProfilePage: React.FC<IProfilePageProps> = ({ id }) => {
    const router = useRouter();
    const { data } = useSession();

    return (
        <div className="flex flex-col items-center justify-start w-screen h-screen relative text-white">
            <Avatar src={data?.user?.image ?? ""} className="mt-5" />
            <div className="mt-3">{data?.user?.email}</div>
            <div className="mt-3">{data?.user?.name}</div>
            <Button onClick={() => signOut()} color="secondary" variant="trans">
                {Messages.signOut}
            </Button>
        </div>
    );
};

export default ProfilePage;
