import React, { useState } from "react";
import { Outlet } from "react-router";
import Header from "./components/header/Header";

function App() {
  const [sidebarState, setSidebarState] = useState(false);
  return (
    <div>
      <Header setSidebarState={setSidebarState} sidebarState={sidebarState} />
      <div onClick={() => setSidebarState(false)}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
