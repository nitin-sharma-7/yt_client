import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import NormalSidebar from "../sidebar/NormalSidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";

function Header() {
  const [input, setInput] = useState("");
  const [sidebarState, setSidebarState] = useState(false);

  return (
    <>
      <div className="flex fixed z-50 items-center justify-between w-full top-0 bg-white shadow-md py-3 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <GiHamburgerMenu
            className="text-xl cursor-pointer hover:text-red-600 transition-colors duration-300"
            onClick={() => setSidebarState(!sidebarState)}
          />

          <h1 className="text-xl font-extrabold text-red-600">YouTube</h1>
        </div>

        <div className="flex items-center w-1/2 max-w-xl">
          <div className="relative flex items-center w-full ">
            <input
              type="text"
              name="search-input"
              value={input}
              placeholder="Search YOUTUBE..."
              className="w-full px-4 h-8 border-2 border-gray-300 focus:border-red-600 rounded-l-full outline-none transition-colors duration-300"
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="bg-gray-100 h-8 hover:bg-gray-200 px-3  border-2 border-l-0 border-gray-300 rounded-r-full transition-colors duration-300 flex items-center ">
              <CiSearch />
            </div>
          </div>
        </div>

        <div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300">
            Login
          </button>
        </div>
      </div>

      <div className="transition-all duration-300 ease-in-out">
        {sidebarState ? <Sidebar /> : <NormalSidebar />}
      </div>
    </>
  );
}

export default Header;
