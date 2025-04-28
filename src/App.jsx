import React from "react";
import { Outlet } from "react-router";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
