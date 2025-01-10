// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'linear-wipe':
                    'linear-gradient(90deg, #f90cff, #6560ff 23%, #0cd7e8 76%, #f90cff)'
            },
            backgroundSize: {
                '200%': '200% auto'
            },
            animation: {
                shine: 'shine 2s linear infinite'
            },
            keyframes: {
                shine: {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '0% 0' }
                }
            }
        }
    },
    plugins: []
}
