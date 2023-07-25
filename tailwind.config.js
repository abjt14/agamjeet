/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        ebgaramond: ['var(--font-eb-garamond)'],
      },
      colors: {
        'cinder': {
          '50': '#f6f6f9',
          '100': '#ececf2',
          '200': '#d4d5e3',
          '300': '#aeb1cb',
          '400': '#8286ae',
          '500': '#636894',
          '600': '#4e517b',
          '700': '#404164',
          '800': '#383954',
          '900': '#323348',
          '950': '#12121a',
        },
        'macaroni-and-cheese': {
          '50': '#fff6ed',
          '100': '#ffebd4',
          '200': '#ffd3a9',
          '300': '#ffb87a',
          '400': '#fe8939',
          '500': '#fc6813',
          '600': '#ed4d09',
          '700': '#c53809',
          '800': '#9c2d10',
          '900': '#7e2710',
          '950': '#441106',
        },
      },
    },
  },
  plugins: [],
}
