import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiHome } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import {
  MdOndemandVideo,
  MdOutlinePlaylistAddCheck,
  MdOutlineSubscriptions,
  MdOutlineWatchLater,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router";
import { addSearch } from "../../slices/searchSlice";

function Sidebar() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex fixed flex-col  h-screen w-56 bg-white shadow-md z-40 top-16 left-0 transition-all duration-300 ease-in-out">
        <div
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
          onClick={() => {
            dispatch(addSearch(""));
          }}
        >
          <BiHome className="text-xl" />{" "}
          <NavLink to="/">
            <span className="text-sm font-medium">Home</span>
          </NavLink>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <SiYoutubeshorts className="text-xl" />
          <span className="text-sm font-medium">Shorts</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <MdOutlineSubscriptions className="text-xl" />
          <span className="text-sm font-medium">Subscriptions</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <FaHistory className="text-xl" />
          <span className="text-sm font-medium">History</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <MdOutlinePlaylistAddCheck className="text-xl" />{" "}
          <span className="text-sm font-medium">Playlist</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <MdOndemandVideo className="text-xl" />{" "}
          <span className="text-sm font-medium">Your videos</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <MdOutlineWatchLater className="text-xl" />
          <span className="text-sm font-medium">Watch later</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <AiOutlineLike className="text-xl" />{" "}
          <span className="text-sm font-medium">Liked videos</span>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
