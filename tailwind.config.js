/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#28425F",
                "page-bg": "#BEC8DC",
                "com-bg": "#D9E1F0",
                "secondary-com-bg": "#D9E5FA",
                "input-bg": "#EBF1FC",
                "primary-text": "#2C3035",
                "secondary-text": "#707B86",
                "hover-color": "#3F5871",
                "gray-light": "rgba(#152331,0.2)",
                "gold": "rgba(192,157,94,1)",
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
