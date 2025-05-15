import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink } from "react-router";

function HomeVideoCard({ data }) {
  // Function to format view count
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
            <div className="hover:bg-gray-300  p-1 transition-all duration-300 rounded-full ">
              <BsThreeDotsVertical />
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

export default HomeVideoCard;
