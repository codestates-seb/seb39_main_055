import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { GlobalStyle } from "./assets/styles";
import { setupStore } from "./redux";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={setupStore()}>
      <GlobalStyle />
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
