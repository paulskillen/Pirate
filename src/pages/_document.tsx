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
            <Head />
            <body>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                {renderPreLoader()}
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
