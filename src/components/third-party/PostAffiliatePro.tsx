import React, { useEffect } from "react";

const PostAffiliatePro = () => {
    useEffect(() => {
        // Add the Post Affiliate Pro tracking code here
        const script = document.createElement("script");
        script.src =
            "https://piratemobile.postaffiliatepro.com/scripts/trackjs.js"; // Replace with your Post Affiliate Pro tracking code URL
        script.async = true;
        script.type = "text/javascript";
        script.onload = function () {
            //@ts-ignore
            PostAffTracker?.setAccountId?.("default1");
            try {
                //@ts-ignore
                PostAffTracker?.track?.();
            } catch (err) {}
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup code if needed
            document.body.removeChild(script);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default PostAffiliatePro;

export const PAPTrackingClick = () => {
    useEffect(() => {
        // Add the Post Affiliate Pro tracking code here
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "pap_x2s6df8d";
        script.src =
            "https://piratemobile.postaffiliatepro.com/scripts/d4dvujx"; // Replace with your Post Affiliate Pro tracking code URL
        script.async = true;
        document.body.appendChild(script);
        const scriptX = document.createElement("script");
        scriptX.type = "text/javascript";
        scriptX.onload = function () {
            //@ts-ignore
            PostAffTracker.setAccountId("default1");
            try {
                //@ts-ignore
                PostAffTracker.track();
            } catch (err) {}
        };
        // Replace with your Post Affiliate Pro tracking code URL
        scriptX.async = true;
        document.body.appendChild(scriptX);

        return () => {
            // Cleanup code if needed
            document.body.removeChild(script);
            document.body.removeChild(scriptX);
        };
    }, []);

    return null; // This component doesn't render anything
};

export const PAPTrackingSale = () => {
    // useEffect(() => {
    //     // Add the Post Affiliate Pro tracking code here
    //     const script = document.createElement("script");
    //     script.type = "text/javascript";
    //     script.id = "pap_x2s6df8d";
    //     script.src =
    //         "https://piratemobile.postaffiliatepro.com/scripts/d4dvujx"; // Replace with your Post Affiliate Pro tracking code URL
    //     script.async = true;
    //     document.body.appendChild(script);

    //     return () => {
    //         // Cleanup code if needed
    //         document.body.removeChild(script);
    //     };
    // }, []);

    //     <script type="text/javascript" id="pap_x2s6df8d" src="https://piratemobile.postaffiliatepro.com/scripts/d4dvujx"></script>

    // <script type="text/javascript">
    //     PostAffTracker.setAccountId('default1');

    //     var sale = PostAffTracker.createSale();
    //     sale.setTotalCost('120.50');
    //     sale.setOrderID('ORD_12345XYZ');
    //     sale.setProductID('test product');

    //    PostAffTracker.register(); </script>

    return null; // This component doesn't render anything
};
