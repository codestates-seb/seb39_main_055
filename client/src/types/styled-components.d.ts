import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    breakPoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    colors: {
      black100: string;
      black200: string;
      black300: string;
      black400: string;
      black500: string;

      orange500: string;
    };
  }
}
