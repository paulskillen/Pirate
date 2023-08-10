/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "rgba(192,157,94,1)",
                "primary-dark": "rgb(153, 118, 53)",
                "primary-light": "rgb(245, 206, 133)",
                "input-bg": "rgb(38, 38, 38)",
                "hover-color": "#3F5871",
                "gray-light": "rgba(#152331,0.2)",
                "gold-light": "rgb(245, 206, 133)",
                gold: "rgba(192,157,94,1)",
                "gold-trans": "rgba(192,157,94,0.25)",
                "gold-dark": "rgb(153, 118, 53)",
                darken: "rgb(38, 38, 38)",
                blackTrans:"#121212"
            },
            fontFamily: {
                sans: ["Poppins"],
                poppins: "Poppins",
                mont: "Montserrat",
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
