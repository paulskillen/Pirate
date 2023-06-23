import React, { useEffect } from "react";

const PostAffiliatePro = () => {
    useEffect(() => {
        // Add the Post Affiliate Pro tracking code here
        const script = document.createElement("script");
        script.src =
            "https://piratemobile.postaffiliatepro.com/scripts/trackjs.js"; // Replace with your Post Affiliate Pro tracking code URL
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup code if needed
            document.body.removeChild(script);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default PostAffiliatePro;
