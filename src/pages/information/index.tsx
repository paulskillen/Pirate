import InformationPage from "@/container/information/InformationPage";
import type { NextPage } from "next";
import Layout from "@/container/shared/layout/Layout";
import styled from "@emotion/styled";
import WPHeader from "@/container/shared/header/WPHeader";

const Information: NextPage = () => {
    return <InformationPage />;
};

export default Information;

// const Landing: NextPage = () => {
//     return (
//         <LandingPageStyled className="landing-page">
//             <iframe
//                 id="landing-page__wordpress"
//                 className="landing-page__wordpress"
//                 src="https://rhq.6db.myftpupload.com/"
//             />
//         </LandingPageStyled>
//     );
// };

// export default Landing;

// //@ts-ignore
// Landing.getLayout = function getLayout(page) {
//     return (
//         <Layout showHideConfig={{ hideLogo: true, hideDesktopHeader: true }}>
//             {page}
//         </Layout>
//     );
// };

// const LandingPageStyled = styled.div`
//     .landing-page__wordpress {
//         width: 100%;
//         min-height: 100vh;
//     }
// `;
