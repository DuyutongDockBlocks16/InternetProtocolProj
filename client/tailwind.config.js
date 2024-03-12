/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.jsx"],
    mode: 'jit',
    theme: {
        extend: {
            colors: {
                dark: "#191722",
                darkHover: "#282a36",
                light: "#f5f5f5",
                primary: "#2FE064",
                danger: "#ef4444",
                success: "#4aee88",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            animation: {
                
            },
        },
    },
    plugins: [],
}
