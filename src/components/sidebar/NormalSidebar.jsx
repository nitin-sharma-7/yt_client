import React from "react";
import { FaRegUser } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { MdOutlineSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";

function NormalSidebar() {
  return (
    <>
      <div className="flex flex-col fixed left-0 w-20 h-screen shadow-md bg-white  z-40 top-16 transition-shadow duration-300 ease-in-out">
        <div className="flex flex-col items-center py-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <FiHome className="text-xl mb-1" />
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center py-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <SiYoutubeshorts className="text-xl mb-1" />
          <span className="text-xs">Shorts</span>
        </div>
        <div className="flex flex-col items-center py-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <MdOutlineSubscriptions className="text-xl mb-1" />
          <span className="text-xs">Subscription</span>
        </div>
        <div className="flex flex-col items-center py-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200">
          <FaRegUser className="text-xl mb-1" />
          <span className="text-xs">You</span>
        </div>
      </div>
    </>
  );
}

export default NormalSidebar;
