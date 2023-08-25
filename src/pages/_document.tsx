/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    const renderPreLoader = () => {
        return (
            <div className="site-preloader">
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                    @keyframes site-preloader-animation {
                        from {
                            transform: rotateZ(0deg);
                        }
                        to {
                            transform: rotateZ(360deg);
                        }
                    }

                    #__next *,
                    #__next *:before,
                    #__next *:after {
                        transition-duration: 0s !important;
                    }

                    body {
                        overflow: hidden !important;
                        overflow-y: scroll !important;
                        height: 100% !important;
                    }

                    .site-preloader {
                        position: fixed;
                        left: 0;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        background-color: #fff;
                        z-index: 99999;
                        opacity: 1;
                    }
                    .site-preloader::before {
                        box - sizing: border-box;
                        content: "";
                        display: block;
                        position: absolute;
                        left: calc(50% - 50px);
                        top: calc(50% - 50px);
                        width: 100px;
                        height: 100px;
                        border-radius: 50px;
                        border: 3px solid rgba(0, 0, 0, .2);
                        border-top-color: rgba(0, 0, 0, .6);

                        animation-name: site-preloader-animation;
                        animation-duration: .5s;
                        animation-timing-function: linear;
                        animation-iteration-count: infinite;
                    }
                    .site-preloader__fade {
                        transition: opacity .3s;
                        opacity: 0;
                    }
                `,
                    }}
                />
            </div>
        );
    };

    const addAPAScriptFunc = () => {
        if (!process.browser) {
            return undefined;
        }
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "pap_x2s6df8d";
        script.src =
            "https://piratemobile.postaffiliatepro.com/scripts/d4dvujx"; // Replace with your Post Affiliate Pro tracking code URL
        script.async = true;
        document.body.appendChild(script);
        const papScriptHeader = document.createElement("script");
        papScriptHeader.src =
            "https://piratemobile.postaffiliatepro.com/scripts/trackjs.js";
        papScriptHeader.id = "pap_x2s6df8d";
        papScriptHeader.type = "text/javascript";
        papScriptHeader.onload = function () {
            try {
                //@ts-ignore
                PostAffTracker.track();
            } catch (err) {
                console.error({ err });
            }
        };
        document.body.appendChild(papScriptHeader);
    };

    return (
        <Html lang="en">
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,500;0,600;0,700;1,400;1,500;1,600&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,500;0,600;0,700;0,900;1,400;1,500;1,600&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <Script id="gtm-script-id" strategy="afterInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':` +
                        `new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],` +
                        `j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=` +
                        `'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);` +
                        `})(window,document,'script','dataLayer','G-HSNF8J72KW');`}
                </Script>
                <Script
                    type="text/javascript"
                    strategy="afterInteractive"
                    id="pap_x2s6df8d"
                    src="https://piratemobile.postaffiliatepro.com/scripts/d4dvujx"
                />
                <Script
                    type="text/javascript"
                    strategy="afterInteractive"
                    onLoad={() => {
                        if (!process.browser) {
                            return undefined;
                        }
                        const papScriptHeader =
                            document.createElement("script");
                        papScriptHeader.src =
                            "https://piratemobile.postaffiliatepro.com/scripts/trackjs.js";
                        papScriptHeader.id = "pap_x2s6df8d";
                        papScriptHeader.type = "text/javascript";
                        papScriptHeader.onload = function () {
                            try {
                                //@ts-ignore
                                PostAffTracker.track();
                            } catch (err) {
                                console.error({ err });
                            }
                        };
                        document.body.appendChild(papScriptHeader);
                    }}
                />
                <Script src="https://www.googletagmanager.com/gtag/js?id=AW-660949335" />
                <Script id="gtm-script-id" strategy="afterInteractive">
                    {`window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-660949335');`}
                </Script>
                <Script
                    id="google-tag-manger"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-5RPL9TJ6');`,
                    }}
                ></Script>
            </Head>
            <body>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                    }}
                ></noscript>
                {renderPreLoader()}
                <Main />
                <NextScript />

                {/* {addAPAScriptFunc()} */}
            </body>
        </Html>
    );
}
