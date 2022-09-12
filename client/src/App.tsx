import { Route, Routes } from "react-router-dom";

import { SharedLayout } from "./components";
import { Main } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Main />} />
      </Route>
    </Routes>
  );
};

export default App;
