import AuthApi from "@/apis/auth/AuthApi";
import { CUSTOMER_TITLES } from "@/common/constant/customer";
import Path from "@/common/constant/path";
import Messages from "@/languages/Messages";
import { useAuthRegister } from "@/store/auth/authHook";
import { Button, InputText, Progress, Select } from "d-react-components";
import { useFormik } from "formik";
import { pick } from "lodash";
import { useRouter } from "next/router";
import React from "react";

export interface IAuthSignUpPageProps {
    [key: string]: any;
}

const AuthSignUpPage: React.FC<IAuthSignUpPageProps> = ({ id }) => {
    const registerData = useAuthRegister();
    const { query, push } = useRouter();
    const profile = query?.profile
        ? JSON.parse((query?.profile as any) ?? {})
        : {};

    const signUpForm = useFormik<any>({
        initialValues: { ...profile },
        enableReinitialize: true,
        onSubmit: (values: any) => {

            const payload = {
                ...pick(values, [
                    "title",
                    "firstName",
                    "lastName",
                    "email",
                    "password",
                    "socialId",
                ]),
            };
            return Progress.show(
                { method: AuthApi.register, params: [payload] },
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
        <div className="relative w-screen h-screen bg-transparent text-white overflow-y-scroll z-10 px-4 pt-4 relative">
            <Button
                variant="trans"
                iconName="arrow_back_ios"
                color="light"
                className="px-0"
                onClick={() => {
                    push(Path.home().href);
                }}
            >
                {Messages.backToHome}
            </Button>
            <Select
                className="mt-3"
                dataSource={CUSTOMER_TITLES}
                classNameLabel="text-white"
                placeholder={Messages.title}
                label={Messages.title}
                value={values?.title}
                error={errors?.title ?? ("" as any)}
                onChange={(v) => setFieldValue("title", v)}
            />
            <InputText
                className="mt-3"
                classNameLabel="text-white"
                placeholder={Messages.firstName}
                label={Messages.firstName}
                value={values?.firstName}
                error={errors?.firstName ?? ("" as any)}
                onChange={(e) => setFieldValue("firstName", e?.target?.value)}
            />
            <InputText
                className="mt-3"
                classNameLabel="text-white"
                placeholder={Messages.lastName}
                label={Messages.lastName}
                value={values?.lastName}
                error={errors?.lastName ?? ("" as any)}
                onChange={(e) => setFieldValue("lastName", e?.target?.value)}
            />
            <InputText
                className="mt-3"
                classNameLabel="text-white"
                placeholder={Messages.email}
                label={Messages.email}
                value={values?.email}
                error={errors?.email ?? ("" as any)}
                onChange={(e) => setFieldValue("email", e?.target?.value)}
            />
            <InputText
                className="mt-3"
                classNameLabel="text-white"
                type="password"
                placeholder={Messages.password}
                label={Messages.password}
                value={values?.password}
                error={errors?.password ?? ("" as any)}
                onChange={(e) => setFieldValue("password", e?.target?.value)}
            />
            <InputText
                className="mt-3"
                classNameLabel="text-white"
                type="password"
                placeholder={Messages.confirmPassword}
                label={Messages.confirmPassword}
                value={values?.confirmPassword}
                error={errors?.confirmPassword ?? ("" as any)}
                onChange={(e) =>
                    setFieldValue("confirmPassword", e?.target?.value)
                }
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