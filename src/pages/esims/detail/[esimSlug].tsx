// application
import ESimDetailPage from "@/container/esims/detail/ESimDetailPage";
import { LayoutClean } from "@/container/shared/layout/Layout";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
    const esimSlug = context?.params?.esimSlug;
    return {
        props: {
            esimSlug,
        },
    };
};

function OrderDetail({ esimSlug }: any) {
    return <ESimDetailPage orderId={esimSlug} />;
}

export default OrderDetail;

OrderDetail.Layout = LayoutClean;
