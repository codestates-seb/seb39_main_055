import { PreloadedState } from "@reduxjs/toolkit";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import { GlobalStyle, theme } from "./assets";
import { initialUser, initialUserInfos, RootState, setupStore } from "./redux";
import { localStorageParser, queryClient } from "./utils";

const [accessToken, refreshToken] =
  localStorageParser<string>("currentUser")?.split(" .") || [];
const locationPermission = !!localStorageParser<boolean>("locationPermission");

const preloadedState: PreloadedState<RootState> =
  accessToken && refreshToken
    ? {
        user: {
          loginStatus: true,
          keepLoggedIn: true,
          userInfos: initialUserInfos,
          accessToken,
          refreshToken,
          locationPermission,
        },
      }
    : { user: { ...initialUser, locationPermission } };

export const store = setupStore(preloadedState);

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
