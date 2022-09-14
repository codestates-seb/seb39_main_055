import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    breakPoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    colors: {
      black010: string;
      black050: string;
      black100: string;
      black200: string;
      black250: string;
      black300: string;
      black400: string;
      black500: string;

      orange010: string;
      orange025: string;
      orange075: string;
      orange500: string;
    };
  }
}
