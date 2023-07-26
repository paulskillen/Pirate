import Path from "@/common/constant/path";
import * as Yup from "yup";
import AppLink from "@/components/link/AppLink";
import PageHeader from "@/container/shared/header/PageHeader";
import Messages from "@/languages/Messages";
import { useAuthAccessToken } from "@/store/auth/authHook";
import { Button, Progress, StringUtils } from "d-react-components";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import AuthSignInSocial from "./AuthSignInSocial";
import AuthApi from "@/apis/auth/AuthApi";
import { useDispatch } from "react-redux";
import { signInAction } from "@/store/auth/authActions";
import InputText from "@/components/input/InputText";

export interface IAuthSignInViewProps {
    [key: string]: any;
}

// const emailReg = new RegExp("^[w-.]+@([w-]+.)+[w-]{2,4}$");

const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Is required !"),
    password: Yup.string().required("Is required !"),
});

const AuthSignInView: React.FC<IAuthSignInViewProps> = ({ id }) => {
    const accessToken = useAuthAccessToken();
    const dispatch = useDispatch();
    const router = useRouter();
    const loginForm = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            // setOnLoadSignIn(true);
            onSubmitHandler();
        },
    });

    const { values, errors } = loginForm || {};

    const onSubmitHandler = async () => {
        const params = { email: values?.username, password: values?.password };
        return Progress.show({ method: AuthApi.login, params }, (res: any) => {
            const { accessToken, profile, isRegistered } =
                res?.data?.data ?? {};
            if (isRegistered && accessToken && profile) {
                dispatch(signInAction({ profile, accessToken }));
            }
        });
    };

    const renderLoginInputs = () => {
        return (
            <div>
                <InputText
                    classNameLabel="text-white"
                    label={Messages.username}
                    placeholder={Messages.username}
                    name="username"
                    value={loginForm.values.username}
                    error={loginForm.errors.username}
                    onChange={loginForm.handleChange}
                />
                <InputText
                    className="mt-3"
                    classNameLabel="text-white"
                    label={Messages.password}
                    placeholder={Messages.password}
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
        <div className="bg-black container px-0">
            <PageHeader
                title={Messages.signIn}
                onLeftClick={() => {
                    router.push(Path.home().href);
                }}
            />
            <div className="px-4 mt-5 h-screen">
                <div>
                    {renderLoginInputs()}
                    <Button
                        type="submit"
                        className="btn btn-primary mt-3 w-100"
                        onClick={() => loginForm.handleSubmit()}
                        // disabled={timeLeft > 0}
                    >
                        {Messages.login}
                    </Button>
                    <div className="d-flex mt-4 align-items-center">
                        <div className="divider " />
                        <small className="mx-3 text text-white">
                            {Messages.or}
                        </small>
                        <div className="divider bg-gold" />
                    </div>
                    <AuthSignInSocial />

                    <div className="mt-4 flex-center">
                        <small className="text text-white">
                            {Messages.dontHaveAnAccount}
                        </small>
                        <AppLink href={Path.singUp()?.href}>
                            <small className="text-gold text font-semibold ml-2 text-underline">
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
