import React from "react";

function ChannelPage() {
  const data = {
    channelId: "channel101",
    channelName: "Code With Nitin",
    handle: "codeWithNitin",
    owner: "userID",
    description:
      "Frontend, backend, and full-stack tutorials for aspiring devs. Learn modern web development through practical projects and real-world examples.",
    channelBanner:
      "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSwLp-COysT7ukjE2mk6WglJk2dHvB5SI3JAjfUyUYFl7KNo6VuHu_hCeE6b9v0vgm-u6ZMm2PWqEv1S_g",
    avatar:
      "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSwLp-COysT7ukjE2mk6WglJk2dHvB5SI3JAjfUyUYFl7KNo6VuHu_hCeE6b9v0vgm-u6ZMm2PWqEv1S_g",
    subscribers: 18400,
    videos: ["video1", "video2", "video3", "video4"],
    joinedDate: "Jan 2018",
  };

  return (
    <div className="bg-gray-50 min-h-screen mt-20">
      {/* Channel Banner */}
      <div className="relative w-full">
        <img
          src={data.channelBanner}
          alt="Channel Banner"
          className="w-full h-48 md:h-56 lg:h-64 object-cover"
        />
      </div>

      {/* Channel Info Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start py-4 gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0 -mt-8 md:-mt-12 z-10">
            <img
              src={data.avatar}
              alt={`${data.channelName} avatar`}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white"
            />
          </div>

          {/* Channel Details */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
              <div>
                <h1 className="text-xl md:text-2xl font-bold">
                  {data.channelName}
                </h1>
                <div className="text-gray-600 text-sm flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                  <span>@{data.handle}</span>
                  <span>{data.subscribers.toLocaleString()} subscribers</span>
                  <span>{data.videos.length} videos</span>
                </div>
                <p className="mt-2 text-sm text-gray-700 line-clamp-2 md:line-clamp-none">
                  {data.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Joined {data.joinedDate}
                </p>
              </div>

              {/* Subscribe Button */}
              <div className="mt-3 md:mt-0">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mt-4">
          <nav className="flex overflow-x-auto hide-scrollbar scrollbar-hide">
            {[
              "Home",
              "Videos",
              "Shorts",
              "Live",
              "Playlists",
              "Community",
              "Channels",
              "About",
            ].map((tab, index) => (
              <button
                key={index}
                className={`px-4 py-3 whitespace-nowrap font-medium text-sm hover:text-gray-900 transition-colors ${
                  index === 1
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Videos Grid */}
        <div className="py-6">
          <h2 className="text-lg font-semibold mb-4">Recent Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* videocard use fetch data by video id and render */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelPage;
