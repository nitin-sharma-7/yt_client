import React, { useState } from "react";
import { Outlet } from "react-router";
import Header from "./components/header/Header";
function App() {
  const [sidebarState, setSidebarState] = useState(false);
  const [popup, setPopup] = useState(false);

  return (
    <div>
      <Header
        setSidebarState={setSidebarState}
        sidebarState={sidebarState}
        popup={popup}
        setPopup={setPopup}
      />
      <div
        onClick={() => {
          setSidebarState(false);
          setPopup(false);
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default App;
