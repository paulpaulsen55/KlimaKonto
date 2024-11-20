/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'

export default {
    content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#FFF5F2',
                    100: '#FFF1EE',
                    200: '#FFE4DE',
                    300: '#FFD5CC',
                    400: '#FFBCAD',
                    500: '#FE795D',
                    600: '#EF562F',
                    700: '#EB4F27',
                    800: '#CC4522',
                    900: '#A5371B'
                  },
                'ultra-olive': '#101F19',
                'dark-olive': '#172C24',
                'olive': '#466045',
                'light-olive': '#D0E7D2',
                'dark-gray': '#1E1E1E',
                'gray': '#2B2E2C',
                'gray-olive': '#43584D',
            },
        },
    plugins: [flowbitePlugin],
    }
}
