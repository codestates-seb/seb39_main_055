import {
  css,
  DefaultTheme,
  FlattenSimpleInterpolation,
} from "styled-components";

export const theme: DefaultTheme = {
  breakPoints: {
    mobile: "481px",
    tablet: "758px",
    desktop: "1281px",
  },
  colors: {
    black010: "#F5F5F5",
    black050: "#D6D6D6",
    black100: "#8d8d8d",
    black200: "#a5a5a5",
    black250: "#797979",
    black300: "#434343",
    black400: "#707070",
    black500: "#161616",

    orange010: "#FFF0C2",
    orange025: "#FFE699",
    orange075: "#FFDB70",
    orange500: "#ffc107",
  },
};

export const mobile = (styles: FlattenSimpleInterpolation) => css`
  @media screen and (max-width: ${theme.breakPoints.mobile}) {
    ${styles}
  }
`;

export const tablet = (styles: FlattenSimpleInterpolation) => css`
  @media screen and (max-width: ${theme.breakPoints.tablet}) {
    ${styles}
  }
`;

export const desktop = (styles: FlattenSimpleInterpolation) => css`
  @media screen and (max-width: ${theme.breakPoints.desktop}) {
    ${styles}
  }
`;

export const colors = (code: keyof typeof theme.colors) => {
  return theme.colors[code];
};
