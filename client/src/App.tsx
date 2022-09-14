import { Route, Routes } from "react-router-dom";

import { SharedLayout } from "./components";
import { Login, Main, Signup } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
};

export default App;
