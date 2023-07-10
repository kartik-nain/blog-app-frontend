export const content = [
  './src/**/*.{js,jsx,ts,tsx}',
  'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
];
export const theme = {
  extend: {
    colors: {
      primary: {
        '50': '#fdf4ff',
        '100': '#fae8ff',
        '200': '#f5d0fe',
        '300': '#f0abfc',
        '400': '#e879f9',
        // '500': '#d946ef',
        '600': '#19d0c5',
        '700': '#22e2af',
        '800': '#86198f',
        '900': '#701a75'
      }
    },
    fontFamily: {
      'body': [
        'Nunito Sans',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'Nunito Sans',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
};
export const plugins = [
  require('flowbite/plugin')
];
export const darkMode = 'media';
