import type { NextPage } from "next";
import styled from "@emotion/styled";
import Path from "@/common/constant/path";
import { useEffect } from "react";

const Landing: NextPage = () => {
    useEffect(() => {
        function handleClick(e: any) {
            return e?.preventDefault?.();
        }

        const iframe: any = document.getElementById("landing-page__wordpress");

        console.log(
            "🚀 >>>>>> file: index.tsx:18 >>>>>> useEffect >>>>>> iframe:",
            iframe
        );
        if (iframe) {
            iframe?.contentWindow?.body?.addEventListener?.(
                "click",
                handleClick
            );
        }

        // document.addEventListener("click", handleClick, false);
        // return () => document.removeEventListener("click", handleClick, false);
    }, []);

    return (
        <LandingPageStyled className="landing-page">
            <iframe
                id="landing-page__wordpress"
                className="landing-page__wordpress"
                src="https://landing.piratemobile.gg"
            />
        </LandingPageStyled>
    );
};

export default Landing;

//@ts-ignore
Landing.getLayout = function getLayout(page) {
    return <div>{page}</div>;
};

const LandingPageStyled = styled.div`
    .landing-page__wordpress {
        width: 100%;
        min-height: 100vh;
    }
`;
