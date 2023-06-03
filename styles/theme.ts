import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
  borderRadius: '5px',
  colors: {
    fg: '#2C2E43',
    bg: '#1d1e2ce6',
    textColor: '#F4F4F4',
    borderColor: '#F4F4F4',
    borderColorHighlight: '#FF6B6B',
  },
  fonts: {
    primary: 'Roboto, sans-serif',
  },
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
  mediaQueries: {
    smallest: `only screen and (max-width: 25em)`, // 400px
    small: `only screen and (max-width: 37.5em)`, // 600px
    medium: `only screen and (max-width: 56em)`, // 900px
    large: `only screen and (max-width: 80em)`, // 1280px
    largest: `only screen and (max-width: 90em)`, // 1440px
  }
};

export { myTheme };