import React from "react";
import AuthSignInView from "./shared/AuthSignInView";

export interface IAuthSignInPageProps {
    [key: string]: any;
}

const AuthSignInPage: React.FC<IAuthSignInPageProps> = ({ id }) => {
    return (
        <div className="relative z-10">
            <AuthSignInView />;
        </div>
    );
};

export default AuthSignInPage;
