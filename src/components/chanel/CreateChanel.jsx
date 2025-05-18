import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addChannel } from "../../slices/channelSlice.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { URL } from "../../URL.js";

function CreateChannel() {
  // Accessing current user info from Redux store
  const user = useSelector((store) => store.user.item);

  // Local state to handle channel form data
  const [channeldata, setChanneldata] = useState({
    channelName: "",
    handle: "",
    description: "",
    channelBanner: "",
    avatar: "",
    owner: user.newuser._id, // Setting the owner from logged-in user's ID
  });

  // Function to show toast notifications
  const notify = (x) => toast(x);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handling changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChanneldata((prev) => ({
      ...prev,
      [name]: value, // Updating specific field in state
    }));
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default page reload on form submission
    post(channeldata); // Calls API function with current form data
  };

  // Async function to post data to server
  async function post(data) {
    try {
      const { data: channelDataRes } = await axios.post(
        `${URL}/channel`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `channelDataRes ${user.token}`,
          },
        }
      );

      // If server responds positively, update state, storage, and redirect
      if (channelDataRes?.channelState) {
        notify("channel created sucessfully"); // Show success notification
        dispatch(addChannel(channelDataRes)); // Add to Redux store
        sessionStorage.setItem("channel", JSON.stringify(channelDataRes)); // Cache channel info
        navigate(`/channel/${channelDataRes.newChannel._id}`); // Redirect to new channel
      }
    } catch (error) {
      // Logs any error occurred during API call
      console.log("error", error.message);
    }
  }

  return (
    <div className="max-w-xl mx-auto my-20 p-6  bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create New Channel
      </h2>

      {/* Channel creation form */}
      <form className="space-y-4">
        {/* Channel Name Input */}
        <div className="flex flex-col">
          <label
            htmlFor="channelName"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Channel Name
          </label>
          <input
            type="text"
            id="channelName"
            name="channelName"
            value={channeldata.channelName}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            placeholder="Enter channel name"
          />
        </div>

        {/* Handle Input */}
        <div className="flex flex-col">
          <label
            htmlFor="handle"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Handle
          </label>
          <div className="flex items-center">
            <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
              @
            </span>
            <input
              type="text"
              id="handle"
              name="handle"
              value={channeldata.handle}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              placeholder="unique_handle"
            />
          </div>
        </div>

        {/* Description Input */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={channeldata.description}
            onChange={handleChange}
            rows="3"
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
            placeholder="Describe your channel"
          ></textarea>
        </div>

        {/* Channel Banner URL Input */}
        <div className="flex flex-col">
          <label
            htmlFor="channelBanner"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Channel Banner URL
          </label>
          <input
            type="text"
            id="channelBanner"
            name="channelBanner"
            value={channeldata.channelBanner}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            placeholder="https://example.com/banner.jpg"
          />
        </div>

        {/* Avatar URL Input */}
        <div className="flex flex-col">
          <label
            htmlFor="avatar"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Avatar URL
          </label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={channeldata.avatar}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Create Channel
        </button>
      </form>
    </div>
  );
}

export default CreateChannel;
