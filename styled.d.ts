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
  }
}