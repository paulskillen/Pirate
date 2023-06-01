import { Html, Head, Main, NextScript } from "next/document";

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
                {/* <script
                    src="//code.tidio.co/n5kpnrwrwg6fivrwgopiu0ypr7df8noh.js"
                    async
                ></script> */}
                <script
                    src="/static/pwa.js"
                    type="text/javascript"
                    defer
                ></script>
            </body>
        </Html>
    );
}
