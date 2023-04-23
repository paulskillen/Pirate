import Path from "@/common/constant/path";
import AppLink from "@/components/link/AppLink";
import LayoutHeader from "@/container/shared/layout/LayoutHeader";
import Messages from "@/languages/Messages";
import { Button, InputText } from "d-react-components";
import { useFormik } from "formik";
import React from "react";
import AuthSignInSocial from "./AuthSignInSocial";

export interface IAuthSignInViewProps {
    [key: string]: any;
}

const AuthSignInView: React.FC<IAuthSignInViewProps> = ({ id }) => {
    const loginForm = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
        // validationSchema: LoginSchema,
        onSubmit: (values) => {
            // setOnLoadSignIn(true);
            onSubmitHandler();
        },
    });

    const onSubmitHandler = () => {};

    const renderLoginInputs = () => {
        return (
            <div>
                <InputText
                    label={Messages.username}
                    name="username"
                    value={loginForm.values.username}
                    error={loginForm.errors.username}
                    onChange={loginForm.handleChange}
                />
                <InputText
                    label={Messages.password}
                    name="password"
                    value={loginForm.values.password}
                    error={loginForm.errors.password}
                    type={"password"}
                    onChange={loginForm.handleChange}
                />
            </div>
        );
    };

    return (
        <div className="">
            <LayoutHeader title={Messages.signIn} bgColor="transparent" />
            <div className="px-4 mt-4">
                <div>
                    {renderLoginInputs()}
                    <Button
                        type="submit"
                        className="btn btn-primary mt-3 w-100"
                        // onClick={() => loginForm.handleSubmit()}
                        // disabled={timeLeft > 0}
                    >
                        {Messages.login}
                    </Button>
                    <div className="d-flex mt-4 align-items-center">
                        <div className="divider " />
                        <small className="mx-3">{Messages.or}</small>
                        <div className="divider " />
                    </div>
                    <AuthSignInSocial />

                    <div className="mt-5 flex-center">
                        <small>{Messages.dontHaveAnAccount}</small>
                        <AppLink href={Path.singUp()?.href}>
                            <small className="text-primary ml-1">
                                {Messages.signUp}
                            </small>
                        </AppLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthSignInView;
