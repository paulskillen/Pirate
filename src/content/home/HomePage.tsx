import React from "react";

export interface IHomePageProps {
    [key: string]: any;
}

const HomePage: React.FC<IHomePageProps> = ({ id }) => {
    return <div className="flex flex-col items-center bg-red-500">Home Page</div>;
};

export default HomePage;
