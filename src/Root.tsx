import { HashRouter, Route, Routes } from "react-router-dom";

import { MainPage } from './Components/MainPage/MainPage'
import { Shop } from "./Components/Shop/Shop";
import { Login } from "./Components/Login/Login";

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
};