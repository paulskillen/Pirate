import Path from "@/common/constant/path";
import Messages from "@/languages/Messages";
import styled from "@emotion/styled";
import { Button } from "d-react-components";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";

export interface IHomePageProps {
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

const HomePage: React.FC<IHomePageProps> = ({ id }) => {
    const router = useRouter();

    return (
        <MainStyled className="home-page_container w-screen h-screen bg-transparent text-white overflow-y-scroll px-4">
            <section className="flex flex-row justify-between items-center mt-4">
                <div className="text h4">{Messages.selectDestination}</div>
                <Button
                    iconName="search"
                    className="rounded px-3"
                    onClick={() => {
                        router.push({ pathname: Path.listCountry().href });
                    }}
                />
            </section>
        </MainStyled>
    );
};

export default HomePage;

const MainStyled = styled.main``;
