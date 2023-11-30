import InformationPage from "@/container/information/InformationPage";
import type { NextPage } from "next";
import Layout from "@/container/shared/layout/Layout";
import styled from "@emotion/styled";

// const Information: NextPage = () => {
//     return <InformationPage />;
// };

// export default Information;

const BlogPage: NextPage = () => {
    return (
        <BlogPageStyled className="landing-page">
            <iframe
                id="landing-page__wordpress"
                className="landing-page__wordpress"
                src="https://rhq.6db.myftpupload.com/blogs/"
            />
        </BlogPageStyled>
    );
};

export default BlogPage;

//@ts-ignore
BlogPage.getLayout = function getLayout(page) {
    return (
        <Layout showHideConfig={{ hideLogo: true, hideDesktopHeader: true }}>
            {page}
        </Layout>
    );
};

const BlogPageStyled = styled.div`
    .landing-page__wordpress {
        width: 100%;
        min-height: 100vh;
    }
`;
