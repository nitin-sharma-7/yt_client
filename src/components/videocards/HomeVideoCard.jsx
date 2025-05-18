import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink } from "react-router";

function HomeVideoCard({ data }) {
  // Function to format view count with suffixes (M for millions, K for thousands)
  // For better readability when displaying large numbers
  const formatViews = (viewCount) => {
    if (viewCount >= 1000000) {
      return (viewCount / 1000000).toFixed(1) + "M";
    } else if (viewCount >= 1000) {
      return (viewCount / 1000).toFixed(1) + "K";
    }
    return viewCount;
  };
  return (
    <div className="sm:w-[480px] mb-6 md:w-80 cursor-pointer">
      {/* Video thumbnail with navigation link to video detail page */}
      <NavLink
        to={`/video/${data._id}`}
        className="relative w-full mb-2 overflow-hidden rounded-lg bg-black"
      >
        <img
          className="w-full h-52 object-fill rounded-lg"
          src={data.snippet.thumbnails.maxres.url}
          alt={data.snippet.title}
        />
        {/* Overlay for video duration in bottom-right corner */}
        {/* Transform YouTube duration format (PT1M30S) to readable format (1:30) */}
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
          {data.contentDetails.duration
            .replace("PT", "") // Remove PT prefix from ISO 8601 duration format
            .replace("M", ":") // Replace M (minutes) with colon
            .replace("S", "")}{" "}
        </div>
      </NavLink>

      {/* Video metadata section with channel image and video details */}
      <div className="flex gap-2 mt-2">
        {/* Channel thumbnail */}
        <img
          src={data.snippet.thumbnails.default.url}
          alt={data.snippet.channelTitle}
          className="w-9 h-9 rounded-full mt-1"
        />

        {/* Video title, options button, channel name, and video stats */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            {/* Title with line clamping to show max 2 lines */}
            <h3 className="font-medium text-sm leading-tight line-clamp-2 mb-1">
              {data.snippet.title}
            </h3>
            {/* Three dots menu button with hover effect */}
            <div className="hover:bg-gray-300 p-1 transition-all duration-300 rounded-full ">
              <BsThreeDotsVertical />
            </div>
          </div>

          {/* Channel name and video statistics */}
          <div className="flex flex-col text-xs text-gray-500">
            <span className="hover:text-black">
              {data.snippet.channelTitle}
            </span>
            <span>
              {/* Format view count with K/M suffixes and display publish date */}
              {formatViews(73749)} views •&nbsp;
              {/* Format publish date in localized format (e.g., May 18, 2025) */}
              {new Date(
                data.publishedAt || data.publishedAt // Fallback in case property name varies
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

export default HomeVideoCard;
