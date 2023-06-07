import AuthApi from "@/apis/auth/AuthApi";
import * as Yup from "yup";
import { CUSTOMER_TITLES } from "@/common/constant/customer";
import Path from "@/common/constant/path";
import Select from "@/components/select/Select";
import Messages from "@/languages/Messages";
import { useAuthRegister } from "@/store/auth/authHook";
import { Button, InputText, Notifications, Progress } from "d-react-components";
import { useFormik } from "formik";
import { pick } from "lodash";
import { useRouter } from "next/router";
import React from "react";

export interface IAuthSignUpPageProps {
    [key: string]: any;
}
const AuthSignUpSchema = Yup.object().shape({});

const AuthSignUpPage: React.FC<IAuthSignUpPageProps> = ({ id }) => {
    const registerData = useAuthRegister();
    const { query, push } = useRouter();
    const profile = query?.profile
        ? JSON.parse((query?.profile as any) ?? {})
        : {};

    const signUpForm = useFormik<any>({
        initialValues: { ...profile },
        enableReinitialize: true,
        validationSchema: AuthSignUpSchema,
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
                (res: any) => {
                    if (res?.data?.data?.profile?.id) {
                        Notifications.showSuccess(
                            Messages.successfullyRegistered
                        );
                        push(Path.singIn());
                    }
                }
            );
        },
    });

    const { values, errors, handleSubmit, handleChange, setFieldValue } =
        signUpForm;

    return (
        <div className="relative bg-transparent text-white overflow-y-scroll z-20 px-4 pt-4">
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
                className="fixed bottom-5 w-auto left-3 right-3"
                onClick={handleSubmit as any}
            >
                {Messages.signUp}
            </Button>
        </div>
    );
};

export default AuthSignUpPage;
