import React, { useState, useRef } from "react";
import Sidebar from "../sidebar/Sidebar";
import NormalSidebar from "../sidebar/NormalSidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { NavLink, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "../../slices/searchSlice";

function Header({ sidebarState, setSidebarState }) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const searchIcon = useRef();

  const loginState = useSelector((store) => store.user.user);

  const handleSearch = () => {
    dispatch(addSearch(input));
  };
  const handleInputClick = (e) => {
    if (e.keyCode == 13) {
      searchIcon.current.click();
    }
  };
  return (
    <>
      <div
        className="flex fixed z-50 items-center justify-between w-full top-0 bg-white  py-3 px-2 sm:px-4 md:px-6 lg:px-8 shadow-sm"
        onClick={() => setSidebarState(false)}
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <GiHamburgerMenu
            className="text-xl cursor-pointer hover:text-red-600 transition-colors duration-300"
            onClick={(e) => {
              setSidebarState(!sidebarState);
              e.stopPropagation();
            }}
          />

          <NavLink
            to="/"
            onClick={() => {
              dispatch(addSearch(""));
              setInput("");
            }}
          >
            <h1 className="text-xl font-extrabold text-red-600">YouDube</h1>
          </NavLink>
        </div>

        <div className="flex items-center w-1/3 sm:w-1/2 ">
          <div className="relative flex items-center w-full ">
            <input
              type="text"
              name="search-input"
              value={input}
              placeholder="Search YOUTUBE..."
              className="w-full px-4 h-8 border-r-0 border-2 border-gray-300 rounded-l-full outline-none transition-colors duration-300 focus:border-red-600 focus:border-r-2"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => handleInputClick(e)}
            />
            {input.length ? (
              <span
                className={`border-y-2 px-2 h-8 border-gray-300 text-red-600 hover:font-bold transition-all duration-300 bg-gray-100 cursor-pointer `}
                onClick={() => setInput("")}
              >
                X
              </span>
            ) : (
              ""
            )}
            <NavLink
              ref={searchIcon}
              to="/"
              onClick={handleSearch}
              className={`bg-gray-100 h-8 hover:bg-gray-200 px-3  border-2 border-l-0 border-gray-300 rounded-r-full transition-colors duration-300 flex items-center cursor-pointer `}
            >
              <CiSearch />
            </NavLink>
          </div>
        </div>

        <div className="w-20">
          <NavLink
            to="/sign"
            className="bg-red-600 text-white px-1 sm:px-3 py-1 rounded-md hover:bg-red-700 transition-colors duration-300"
          >
            {true ? "Sign up" : " Sign in"}
          </NavLink>
        </div>
      </div>

      <div className="transition-all duration-300 ease-in-out">
        {sidebarState ? <Sidebar /> : pathname == "/" ? <NormalSidebar /> : ""}
      </div>
    </>
  );
}

export default Header;
