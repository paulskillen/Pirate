import AuthApi from "@/apis/auth/AuthApi";
import Messages from "@/languages/Messages";
import { useAuthRegister } from "@/store/auth/authHook";
import { Button, InputText, Progress } from "d-react-components";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

export interface IAuthSignUpPageProps {
    [key: string]: any;
}

const AuthSignUpPage: React.FC<IAuthSignUpPageProps> = ({ id }) => {
    const registerData = useAuthRegister();
    const { query } = useRouter();
    const profile = query?.profile
        ? JSON.parse((query?.profile as any) ?? {})
        : {};

    const signUpForm = useFormik<any>({
        initialValues: { ...profile },
        enableReinitialize: true,
        onSubmit: (values: any) => {
            return Progress.show(
                { method: AuthApi.register, params: [] },
                (res) => {
                    console.log(
                        "🚀 >>>>>> file: AuthSignUpPage.tsx:32 >>>>>> res:",
                        res
                    );
                }
            );
        },
    });

    const { values, errors, handleSubmit, handleChange, setFieldValue } =
        signUpForm;

    return (
        <div className="bg-white px-3">
            <InputText
                className="mt-2"
                placeholder={Messages.firstName}
                label={Messages.firstName}
                value={values?.firstName}
                error={errors?.firstName ?? ("" as any)}
                onChange={(e) => setFieldValue("firstName", e?.target?.value)}
            />
            <InputText
                className="mt-2"
                placeholder={Messages.lastName}
                label={Messages.lastName}
                value={values?.lastName}
                error={errors?.lastName ?? ("" as any)}
                onChange={(e) => setFieldValue("lastName", e?.target?.value)}
            />
            <InputText
                className="mt-2"
                placeholder={Messages.email}
                label={Messages.email}
                value={values?.email}
                error={errors?.email ?? ("" as any)}
                onChange={(e) => setFieldValue("email", e?.target?.value)}
            />
            <InputText
                className="mt-2"
                type="password"
                placeholder={Messages.password}
                label={Messages.password}
                value={values?.password}
                error={errors?.password ?? ("" as any)}
                onChange={(e) => setFieldValue("password", e?.target?.value)}
            />
            <Button
                className="absolute bottom-4 w-auto left-3 right-3"
                onClick={handleSubmit as any}
            >
                {Messages.signUp}
            </Button>
        </div>
    );
};

export default AuthSignUpPage;
