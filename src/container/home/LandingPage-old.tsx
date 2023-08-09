import BundleApi from "@/apis/bundle/BundleApi";
import Select from "@/components/select/Select";
import { writeUserData } from "@/firebase/Firebase";
import { Button, InputText, StringUtils } from "d-react-components";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

export interface ILandingPageProps {
    [key: string]: any;
}

const IMG_MOBILE = 250;
const IMG_DESKTOP = 600;

enum TypeOfData {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW",
}
const TYPE_OF_DATA = [
    {
        id: TypeOfData.HIGH,
        label: "High",
    },
    {
        id: TypeOfData.MEDIUM,
        label: "Medium",
    },
    {
        id: TypeOfData.LOW,
        label: "Low",
    },
];

const validationSchema = Yup.object().shape({
    dataType: Yup.string().required("Required field!"),
    location: Yup.string().required("Required field!"),
    email: Yup.string()
        .email("Email must be a valid email!")
        .required("Required field!"),
});

const LandingPage: React.FC<ILandingPageProps> = ({ id }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { values, errors, handleChange, handleSubmit, setFieldValue } =
        useFormik<any>({
            initialValues: {},
            onSubmit: () => {
                onSubmitHandler();
            },
            validateOnChange: false,
            enableReinitialize: true,
            validationSchema,
        });

    useEffect(() => {
        // loadData();
    }, []);

    const loadData = async () => {
        const data = await BundleApi.listBundleFromCountry("BO");
    };

    const onSubmitHandler = async () => {
        const { email, location, period, dataType } = values;
        const submitted = await writeUserData(
            StringUtils.getUniqueID(),
            values
        );
        setIsSubscribed(true);
    };

    const renderSubscribeForm = () => {
        return (
            <section className="h-auto w-full px-3 bg-primary flex flex-col justify-start items-center">
                <h3 className="block text-2xl  text-center text-white mt-6">
                    Get Your eSim: Our Customer Team will assist you all the way
                </h3>
                <div className="w-full md:w-auto mt-6 flex flex-col justify-center">
                    <InputText
                        name="email"
                        label="Your Email"
                        placeholder="e.g., email@example.com"
                        classNameLabel="text-white"
                        classNameInput=""
                        value={values?.email}
                        error={errors?.email as any}
                        onChange={handleChange}
                    />
                    <InputText
                        name="location"
                        label="Where are you travelling to ?"
                        placeholder="e.g., Bangkok"
                        classNameLabel="text-white"
                        classNameInput=""
                        className="mt-6"
                        value={values?.location}
                        error={errors?.location as any}
                        onChange={handleChange}
                    />
                    <InputText
                        name="period"
                        label="How many days will you stay there ?"
                        placeholder="e.g., 10"
                        classNameLabel="text-white"
                        classNameInput=""
                        className="mt-6"
                        value={values?.period}
                        error={errors?.period as any}
                        onChange={handleChange}
                    />
                    <Select
                        label="Please select type of data usage that fits to you !"
                        placeholder="Please select"
                        classNameLabel="text-white"
                        className="mt-6"
                        dataSource={TYPE_OF_DATA as any}
                        value={values?.dataType}
                        error={errors?.dataType as any}
                        getLabel={(item) => item?.label}
                        onChange={(v) => setFieldValue("dataType", v)}
                    />
                    <div className="flex-center w-full mt-6">
                        <Button
                            color="light"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Join
                        </Button>
                    </div>
                </div>
                {isSubscribed && (
                    <div className="text-lg mt-6">Thanks for subscribing!</div>
                )}
                <div className="h-20" />
            </section>
        );
    };

    return (
        <main className="home-page_container w-screen h-screen bg-black text-white overflow-y-scroll">
            <section className="min-h-screen w-full px-3 flex-col lg:flex-row flex justify-center items-center">
                <Image
                    className="none lg:block"
                    alt="logo"
                    src="/images/logo/logo.png"
                    width={IMG_DESKTOP}
                    height={IMG_DESKTOP}
                />
                <Image
                    className="block lg:hidden"
                    alt="logo"
                    src="/images/logo/logo.png"
                    width={IMG_MOBILE}
                    height={IMG_MOBILE}
                />
                <div className="flex flex-col text-center mt-9">
                    <h2 className="text-6xl text-white">Save 90%</h2>
                    <h3 className="text-4xl mt-9 text-wrap max-w-lg text-white">
                        of Mobile Data cost
                    </h3>
                    <h3 className="text-4xl mt-9 text-wrap max-w-lg text-white">
                        when traveling
                    </h3>
                    <p className="max-w-lg mt-9 leading-10">
                        Forget Roaming bills Improve Convenience, Reduce Cost
                        and Expand Coverage Join more than 1,000,000 People
                        using eSims & our service when traveling.
                    </p>
                </div>
            </section>
            {renderSubscribeForm()}
        </main>
    );
};

export default LandingPage;
