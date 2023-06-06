import React from "react";
import AuthSignInView from "./shared/AuthSignInView";

export interface IAuthSignInPageProps {
    [key: string]: any;
}

const AuthSignInPage: React.FC<IAuthSignInPageProps> = ({ id }) => {
    return <AuthSignInView />;
};

export default AuthSignInPage;
