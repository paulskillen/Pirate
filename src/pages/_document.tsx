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

    const addAPAScript = () => {
        if (!process.browser) {
            return undefined;
        }
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
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Head>
            <body>
                {renderPreLoader()}
                <Main />
                <NextScript />
                <script
                    type="text/javascript"
                    id="pap_x2s6df8d"
                    src="https://piratemobile.postaffiliatepro.com/scripts/d4dvujx"
                ></script>

                <script
                    type="text/javascript"
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
                {/* <script
                    type="text/javascript"
                    onLoad={() => {
                        //@ts-ignore
                        PostAffTracker.setAccountId("default1");
                        try {
                            //@ts-ignore
                            PostAffTracker.track();
                        } catch (err) {
                            console.error({ err });
                        }
                    }}
                /> */}

                {addAPAScript()}

                {/* <script
                    type="text/javascript"
                    onLoad={function () {
                        var papScriptHeader = document.createElement("script");
                        papScriptHeader.src =
                            "https://URL_TO_PostAffiliatePro/scripts/trackjs.js";
                        papScriptHeader.id = "pap_x2s6df8d";
                        papScriptHeader.type = "text/javascript";
                        papScriptHeader.onload = function () {
                            try {
                                //@ts-ignore
                                PostAffTracker.setAccountId("default1");
                                //@ts-ignore
                                PostAffTracker.track();
                            } catch (err) {}
                        };
                        document.body.appendChild(papScriptHeader);
                    }}
                /> */}
            </body>
        </Html>
    );
}
