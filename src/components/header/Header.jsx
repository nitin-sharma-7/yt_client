import React, { useState, useRef } from "react";
import Sidebar from "../sidebar/Sidebar";
import NormalSidebar from "../sidebar/NormalSidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "../../slices/searchSlice";
import { addUser } from "../../slices/userSlice";
import { addChannel } from "../../slices/channelSlice";
import toast, { Toaster } from "react-hot-toast";

function Header({ sidebarState, setSidebarState, popup, setPopup }) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const searchIcon = useRef();
  const navigate = useNavigate();
  const notify = (x) => toast(x);
  const user = useSelector((store) => store.user.item);
  const handleSearch = () => {
    dispatch(addSearch(input));
  };
  const handleInputClick = (e) => {
    if (e.keyCode == 13) {
      searchIcon.current.click();
    }
  };
  function handleSignOut() {
    notify("sign-out sucessfully");
    setPopup(!popup);
    sessionStorage.clear();
    dispatch(addUser({}));
    dispatch(addChannel({}));
    navigate("/");
  }
  const channel =
    useSelector((store) => store.channel.item) ||
    JSON.parse(sessionStorage.getItem("channel"));
  return (
    <>
      <div
        className="flex fixed z-50 items-center justify-between w-full top-0 bg-white  py-3 px-2 sm:px-4 md:px-6 lg:px-8 shadow-sm"
        onClick={() => setSidebarState(false)}
      >
        <Toaster
          toastOptions={{
            duration: 2000,
            removeDelay: 1000,
            style: {
              fontWeight: "bold",
              background: "white",
              color: "black",
            },
          }}
        />
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
              placeholder="Search..."
              className="w-full px-4 h-8 border-r-0 border-2 border-gray-300 rounded-l-full outline-none transition-colors duration-300 text-sm focus:border-red-600 focus:border-r-2"
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

        {user?.loginState ? (
          <div className="relative">
            <div
              onClick={() => setPopup(!popup)}
              className="cursor-pointer hover:scale-105 transition-all duration-300"
              title="click"
            >
              <img
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-fill border-2 border-red-500 hover:border-red-600 "
                src={user?.newuser?.avatar}
                alt={`${user?.newuser?.username} image`}
              />
            </div>

            {popup && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10 transform transition-all duration-200 ease-in-out">
                <div className=" flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <img
                    src={user.newuser.avatar}
                    alt={user.newuser.username}
                    className="w-10 h-10 rounded-full border-red-500 border-2"
                  />
                  <span className="font-bold ">{user.newuser.username}</span>
                </div>
                {channel?.channelState ? (
                  // If user has a channel, show channel link
                  <NavLink
                    to={`/channel/${channel.newChannel._id}`}
                    onClick={() => setPopup(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className="w-6 h-6 rounded-full border-red-500 border-2"
                        src={channel?.newChannel?.avatar}
                        alt="channel image"
                      />
                      {channel?.newChannel?.channelName}
                    </div>
                  </NavLink>
                ) : (
                  // If user doesn't have a channel, show create channel link
                  <NavLink
                    to="/channel/create"
                    onClick={() => setPopup(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Create Channel
                  </NavLink>
                )}

                {/* Sign Out button */}
                <p
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  Sign Out
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="w-20">
            <NavLink
              to="/sign"
              className="bg-red-600 text-white px-1 sm:px-3 py-1 rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              {user?.state ? "Sign in" : " Sign up"}
            </NavLink>
          </div>
        )}
      </div>

      <div className="transition-all duration-300 ease-in-out">
        {sidebarState ? <Sidebar /> : pathname == "/" ? <NormalSidebar /> : ""}
      </div>
    </>
  );
}

export default Header;
