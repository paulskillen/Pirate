import React, { useEffect } from "react";

export interface IGoogleAdsProps {
    [key: string]: any;
}

// <script async src="https://www.googletagmanager.com/gtag/js?id=G-HSNF8J72KW">
// </script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-HSNF8J72KW');
// </script>

const GoogleTagScript: React.FC<IGoogleAdsProps> = ({ id }) => {
    useEffect(() => {
        // Add the Post Affiliate Pro tracking code here
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-HSNF8J72KW"; // Replace with your Post Affiliate Pro tracking code URL
        document.head.appendChild(script);
        const scriptX = document.createElement("script");
        document.body.appendChild(scriptX);

        return () => {
            // Cleanup code if needed
            document.body.removeChild(script);
            document.body.removeChild(scriptX);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default GoogleTagScript;
