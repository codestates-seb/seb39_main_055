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
import { queryClient } from "./utils";

const currentUserToken = JSON.parse(
  localStorage.getItem("currentUser") || "null"
);
const preloadedState: PreloadedState<RootState> = currentUserToken
  ? {
      user: {
        loginStatus: true,
        keepLoggedIn: true,
        userInfos: initialUserInfos,
        token: currentUserToken,
      },
    }
  : { user: initialUser };
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
