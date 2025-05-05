import React, { useState } from "react";

function CreateChannel() {
  const [channeldata, setChanneldata] = useState({
    channelName: "",
    handle: "",
    description: "",
    channelBanner: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChanneldata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Channel data submitted:", channeldata);
    post(channeldata);
  };
  async function post(data) {
    try {
      const res = await fetch("http://localhost:3000/channel", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json", // important to pass
          authorization:
            "x eyJhbGciOiJIUzI1NiJ9.Im5pdGluU2hhcm1hIg.7HQP4K5dDS9T9y9cxZB6xs7cFkfrVJxcgEIKpTbHRpA",
        },
      });

      // handle the response here
      const x = await res.json();
      console.log(x);
    } catch (error) {
      // handle error here
      console.log("error", error.message);
    }
  }
  return (
    <div className="max-w-xl mx-auto my-20 p-6  bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create New Channel
      </h2>

      <form method="/" className="space-y-4">
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
