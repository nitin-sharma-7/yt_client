import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function SideVideo({ data }) {
  const countSimple = (subs) => {
    if (subs >= 1000000000) return (subs / 1000000000).toFixed(2) + " B";
    else if (subs >= 1000000) return (subs / 1000000).toFixed(2) + " M";
    else if (subs >= 1000) return (subs / 1000).toFixed(2) + " K";
    else return subs;
  };
  return (
    <div className="flex gap-2 group hover:bg-gray-100 p-1 md:p-0 cursor-pointer rounded-lg w-full max-w-md transition-all duration-300">
      {/* Thumbnail with duration */}
      <div className="">
        <div className="relative w-40">
          <img
            src={data.snippet.thumbnails.maxres.url}
            alt={data.snippet.title}
            className="w-full h-24 object-fill rounded"
          />
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
            {data.contentDetails.duration
              .replace("PT", "")
              .replace("M", ":")
              .replace("S", "")}
          </div>
        </div>
      </div>

      {/* Video info */}
      <div className="flex flex-col flex-grow justify-between ">
        <div className="flex justify-between">
          {/* Title */}
          <h3 className="text-sm font-medium line-clamp-2 mr-2 flex-grow">
            {data.snippet.title}
          </h3>

          {/* Three dots menu - visible on hover */}
          <button className="text-gray-500 opacity-0 group-hover:opacity-100 h-6 w-6 flex items-center justify-center">
            <BsThreeDotsVertical />
          </button>
        </div>

        {/* Channel name */}
        <p className="text-xs text-gray-500 mt-1">
          {data.snippet.channelTitle}
        </p>

        {/* Views and date */}
        <div className="text-xs text-gray-500 mt-1">
          <span>{countSimple(68666)} views</span>
          <span className="mx-1">•</span>
          <span>
            {new Date(data.publishedAt || data.createdAt).toLocaleDateString(
              undefined,
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SideVideo;
