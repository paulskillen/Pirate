import Image from "next/image";
import React from "react";

export interface IHomePageProps {
    [key: string]: any;
}

const HomePage: React.FC<IHomePageProps> = ({ id }) => {
    return (
        <div className="flex flex-col items-center bg-primary">
            Home Page
            <Image
                alt="logo"
                src="/images/logo/logo.webp"
                width={100}
                height={100}
            />
        </div>
    );
};

export default HomePage;
