/* eslint-disable react/no-unescaped-entities */
import LandingPage from "@/container/home/LandingPage";
import PageHeader from "@/container/shared/header/PageHeader";
import { LayoutClean, LayoutAuth } from "@/container/shared/layout/Layout";
import Messages from "@/languages/Messages";
import { Button } from "d-react-components";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Policy: NextPage = () => {
    const router = useRouter();
    return (
        <div className="bg-black">
            <PageHeader title={Messages.policy} />
            <p className="h-screen px-4 pt-4 pb-20 overflow-y-scroll z-50 bg-black relative text-white">
                <h3 className="font-bold mb-3 text-white">
                    Terms and Conditions for Sale of Non-Refundable Product:
                </h3>
                <section>
                    Pirate Mobile eSims are a digital product. The purchaser is
                    provided a a series of network access codes to third party
                    networks. Once these codes have been delivered to the
                    customer in whatever format (Alphanumeric, QR code or
                    Digitally) can gain access to the network.
                </section>

                <section className="mt-2">
                    <b>1. Definition of Non-Refundable Product:</b>The eSim
                    product sold under this agreement is a non-refundable
                    product. This means that once the product has been
                    purchased, the buyer will not be entitled to a refund of any
                    kind.
                </section>
                <section className="mt-2">
                    <b>2. Payment Terms:</b> The buyer must make full payment
                    for the non-refundable product at the time of purchase. No
                    refunds will be given for any reasons, including cancelled
                    orders or returned goods.
                </section>
                <section className="mt-2">
                    <b>3. Product Ownership:</b> The seller retains ownership of
                    the non-refundable product until full payment has been made
                    by the buyer.
                </section>
                <section className="mt-2">
                    <b>4. Disclaimer of Warranties:</b> The seller makes no
                    warranty or representation, either express or implied,
                    regarding the non-refundable product. The product is sold
                    "as is" and the seller shall not be liable for any damages,
                    including but not limited to direct, indirect, or incidental
                    damages, arising from the purchase or use of the
                    non-refundable product.
                </section>
                <section className="mt-2">
                    <b>5. Limitation of Liability:</b>
                    The seller’s liability is limited to the price paid by the
                    buyer for the non-refundable product. The seller shall not
                    be liable for any consequential, exemplary, special, or
                    incidental damages arising from the purchase or use of the
                    non-refundable product.
                </section>
                <section className="mt-2">
                    <b>6. Governing Law:</b>This agreement shall be governed by
                    the laws of the state or country in which the seller is
                    located.
                </section>
                <section className="mt-2">
                    <b>7. Dispute Resolution:</b> Any disputes arising from the
                    sale of the non-refundable product shall be resolved through
                    arbitration.
                </section>
                <section className="mt-2">
                    <b>8. Modification of Terms:</b>
                    The seller reserves the right to modify these terms and
                    conditions at any time without notice. Such modifications
                    shall be effective immediately upon posting on the seller’s
                    website.
                </section>
                <section className="mt-2">
                    <b>9. Entire Agreement:</b>
                    This agreement constitutes the entire understanding between
                    the buyer and the seller with respect to the non-refundable
                    product and supersedes all prior or contemporaneous
                    agreements, representations, and understandings, whether
                    oral or written. By purchasing the non-refundable product,
                    the buyer acknowledges and agrees to be bound by these terms
                    and conditions. If the buyer does not agree with any of
                    these terms and conditions, the buyer should not purchase
                    the non-refundable product.
                </section>
                <div className="h-20"/>
            </p>
        </div>
    );
};

export default Policy;

//@ts-ignore
Policy.Layout = LayoutClean;
