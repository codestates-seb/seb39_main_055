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
    black100: "#8d8d8d",
    black200: "#a5a5a5",
    black250: "#797979",
    black300: "#434343",
    black400: "#707070",
    black500: "#161616",

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
