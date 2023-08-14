// /** @type {import('next').NextConfig} */

// const withPWA = require("next-pwa")({
//     dest: "public",
//     register: true,
//     disable: process.env.REACT_APP_ENV === "dev",
//     skipWaiting: true,
// });
// const nextConfig = withPWA({
//     reactStrictMode: true,
//     env: {
//         REACT_APP_ENV: process.env.REACT_APP_ENV,
//     },
// });
// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    // async rewrites() {
    //     return {
    //         beforeFiles: [
    //             {
    //                 source: "/landing",
    //                 destination: "https://rhq.6db.myftpupload.com/",
    //             },
    //         ],
    //     };
    // },
    reactStrictMode: true,
    env: {
        REACT_APP_ENV: process.env.REACT_APP_ENV,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    images: {
        domains: [
            "www.icloud.com",
            "drive.google.com",
            "rhq6db.n3cdn1.secureserver.net",
            "pirate-mobile-pro.s3.amazonaws.com",
        ],
    },
};

module.exports = nextConfig;
