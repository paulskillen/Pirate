import AuthApi from "@/apis/auth/AuthApi";
import { signOut, useSession } from "next-auth/react";
import * as Yup from "yup";
import { CUSTOMER_TITLES } from "@/common/constant/customer";
import Path from "@/common/constant/path";
import Messages from "@/languages/Messages";
import { useAuthRegister } from "@/store/auth/authHook";
import {
    Button,
    InputText,
    Notifications,
    Progress,
    InputTextPassword,
} from "d-react-components";
import { useFormik } from "formik";
import { pick } from "lodash";
import { useRouter } from "next/router";
import React from "react";
import Icon from "@/components/icon/Icon";
import Select from "@/components/select/Select";

export interface IAuthSignUpPageProps {
    [key: string]: any;
}
const AuthSignUpSchema = Yup.object().shape({
    firstName: Yup.string().required(Messages.requiredField),
    lastName: Yup.string().required(Messages.requiredField),
    email: Yup.string().email().required(Messages.requiredField),
    password: Yup.string().required(Messages.requiredField),
    confirmPassword: Yup.string().when("password", (pw: any, yup) => {
        if (pw) {
            const reg = new RegExp(pw);
            return Yup.string()
                .matches(reg, {
                    message: Messages.passwordsAreNotMatched,
                })
                .required(Messages.requiredField);
        }
        return Yup.string().required(Messages.requiredField);
    }),
});

const AuthSignUpPage: React.FC<IAuthSignUpPageProps> = ({ id }) => {
    const registerData = useAuthRegister();
    const { data: session } = useSession();
    const { query, push } = useRouter();
    const profile = query?.profile
        ? JSON.parse((query?.profile as any) ?? {})
        : {};

    const signUpForm = useFormik<any>({
        initialValues: { ...profile },
        enableReinitialize: true,
        validationSchema: AuthSignUpSchema,
        validateOnChange: false,
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
                        push && push(Path.singIn().href);
                    }
                }
            );
        },
    });

    const { values, errors, handleSubmit, handleChange, setFieldValue } =
        signUpForm;

    return (
        <div className="relative text-white overflow-y-scroll h-screen z-20 px-4 pt-4">
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
                // allowClear={false}
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
            <InputTextPassword
                className="input-text-password mt-3"
                classNameLabel="text-white"
                type="password"
                placeholder={Messages.password}
                label={Messages.password}
                value={values?.password}
                error={errors?.password ?? ("" as any)}
                onChange={(e) => setFieldValue("password", e?.target?.value)}
            />
            <InputTextPassword
                className="input-text-password mt-3"
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
            {session && (
                <div className="w-full flex justify-end mt-3">
                    <div
                        className="underline"
                        onClick={() => {
                            push(Path.profile().href);
                            signOut();
                        }}
                    >
                        <Icon
                            useIconSet="google-material"
                            icon="cached"
                            className="text-gray-300 mr-2 inline-block"
                        />
                        {Messages.switchToOtherAccount}
                    </div>
                </div>
            )}
            <Button
                className="fixed bottom-5 w-auto left-3 right-3 bg-primary"
                onClick={handleSubmit as any}
            >
                {Messages.signUp}
            </Button>
        </div>
    );
};

export default AuthSignUpPage;
