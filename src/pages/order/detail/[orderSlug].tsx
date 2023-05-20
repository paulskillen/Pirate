// application
import OrderDetailPage from "@/container/order/detail/OrderDetailPage";
import { LayoutClean } from "@/container/shared/layout/Layout";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
    const orderSlug = context?.params?.orderSlug;
    return {
        props: {
            orderSlug,
        },
    };
};

function OrderDetail({ orderSlug }: any) {
    return <OrderDetailPage orderId={orderSlug} />;
}

export default OrderDetail;

OrderDetail.Layout = LayoutClean;
