/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                'ultra-olive': '#101F19',
                'dark-olive': '#172C24',
                'olive': '#466045',
                'light-olive': '#D0E7D2',
                'dark-gray': '#1E1E1E'
            },
        },
    plugins: [],
    }
}
