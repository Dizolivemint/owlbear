// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      fg: string;
      bg: string;
      textColor: string;
      borderColor: string;
      borderColorHighlight: string;
    };

    fonts: {
      primary: string;
    };

    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };

    mediaQueries: {
      smallest: string;
      small: string;
      medium: string;
      large: string;
      largest: string;
    };
  }
}