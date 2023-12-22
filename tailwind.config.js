/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  plugins: [require('flowbite/plugin')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          100: '#E9C46AFF',
          200: '#E9B666FF',
          300: '#E8A862FF',
          400: '#E89A5EFF',
          500: '#E88B59FF',
          600: '#E77D55FF',
          700: '#E76F51FF',
        },
      }
    },
  },
  plugins: [],
}
