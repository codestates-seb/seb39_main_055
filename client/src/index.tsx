import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import { GlobalStyle, theme } from "./assets";
import { setupStore } from "./redux";

const queryClient = new QueryClient();
export const store = setupStore();

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
