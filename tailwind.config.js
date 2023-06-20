/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#28425F",
                "primary-dark": "#0d1c2b",
                "primary-light": "#476a92",
                "input-bg": "#EBF1FC",
                "hover-color": "#3F5871",
                "gray-light": "rgba(#152331,0.2)",
                "gold-light": "rgb(245, 206, 133)",
                gold: "rgba(192,157,94,1)",
                "gold-dark": "rgb(153, 118, 53)",
            },
            fontFamily: {
                sans: ["Poppins"],
                poppins: "Poppins",
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
