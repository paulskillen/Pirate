import type { NextPage } from "next";
import styled from "@emotion/styled";

const Landing: NextPage = () => {
    return (
        <LandingPageStyled className="landing-page">
            <iframe
                className="landing-page__wordpress"
                src="https://rhq.6db.myftpupload.com/"
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
