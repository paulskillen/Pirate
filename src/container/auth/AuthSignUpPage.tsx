import { useAuthRegister } from "@/store/auth/authHook";
import React from "react";

export interface IAuthSignUpPageProps {
    [key: string]: any;
}

const AuthSignUpPage: React.FC<IAuthSignUpPageProps> = ({ id }) => {
    const registerData = useAuthRegister();
    console.log(
        "🚀 >>>>>> file: AuthSignUpPage.tsx:11 >>>>>> registerData:",
        registerData
    );
    return <div>AuthSignUpPage</div>;
};

export default AuthSignUpPage;
