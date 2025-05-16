import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { URL } from "../../URL";

function ChannelVideoCard({ data, editPopup, setEditPopup, index }) {
  const [updateVideo, setUpdateVideo] = useState({
    title: "",
    description: "",
    maxres: "",
    tags: "",
    duration: "",
  });
  const navigate = useNavigate();
  const notify = (x) => toast(x);
  const user = useSelector((store) => store.user.item);
  async function handleDelete(id) {
    try {
      const { data: res } = await axios.delete(`${URL}/video/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `channelDataRes ${user.token}`,
        },
      });
      navigate("/");
      user.token && notify(res.message);
    } catch (error) {
      console.log(error);
    }
  }

  const formatViews = (viewCount) => {
    if (viewCount >= 1000000) {
      return (viewCount / 1000000).toFixed(1) + "M";
    } else if (viewCount >= 1000) {
      return (viewCount / 1000).toFixed(1) + "K";
    }

    return viewCount;
  };
  return (
    <div className="sm:w-[480px]  mb-6 md:w-80  cursor-pointer">
      <NavLink
        to={`/video/${data._id}`}
        className="relative w-full mb-2 overflow-hidden rounded-lg bg-black"
      >
        <img
          className="w-full h-52 object-fill rounded-lg"
          src={data.snippet.thumbnails.maxres.url}
          alt={data.snippet.title}
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
          {data.contentDetails.duration
            .replace("PT", "")
            .replace("M", ":")
            .replace("S", "")}
        </div>
      </NavLink>

      <div className="flex gap-2 mt-2">
        <img
          src={data.snippet.thumbnails.default.url}
          alt={data.snippet.channelTitle}
          className="w-9 h-9 rounded-full mt-1"
        />

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm leading-tight line-clamp-2 mb-1">
              {data.snippet.title}
            </h3>
            <div className="relative">
              <div
                className="hover:bg-gray-200 p-2 transition-all duration-300 rounded-full cursor-pointer"
                onClick={() =>
                  editPopup === null ? setEditPopup(index) : setEditPopup(null)
                }
              >
                <BsThreeDotsVertical className="text-gray-600" />
              </div>

              {editPopup === index && (
                <div className="absolute z-10 top-8 right-0 bg-white shadow-lg border rounded-md py-1 w-28">
                  <NavLink
                    to={`/video/update/${data._id}`}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </NavLink>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col text-xs text-gray-500">
            <span className="hover:text-black">
              {data.snippet.channelTitle}
            </span>
            <span>
              {formatViews(73749)} views •&nbsp;
              {new Date(
                data.publishedAt || data.publishedAt
              ).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelVideoCard;
