import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function HomeVideoCard() {
  const data = {
    id: "KPLWWIOCOOQ",
    snippet: {
      publishedAt: "2019-03-05T16:00:03Z",
      channelId: "UCQzdMyuz0Lf4zo4uGcEujFw",
      title: "Game of Thrones | Season 8 | Official Trailer (HBO)",
      description:
        "The trailer is here. #GameofThrones The Final Season begins April 14 on HBO.",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/rlR4PJn8b8I/default.jpg",
          width: 120,
          height: 90,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/KPLWWIOCOOQ/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "GameofThrones",
      tags: [
        "Game of Thrones",
        "GoT",
        "HBO",
        "Season 8",
        "Final Season",
        "Trailer",
        "Jon Snow",
        "Daenerys",
        "Cersei",
        "Dragon",
      ],
      defaultAudioLanguage: "en",
    },
    contentDetails: {
      duration: "PT2M20S",
    },
    statistics: {
      viewCount: "42856927",
      likeCount: "745000",
      favoriteCount: "0",
      commentCount: "72453",
    },
    videoLink: "https://www.youtube.com/watch?v=KPLWWIOCOOQ",
    comments: [
      {
        id: "UgzNDc4MjEyMzg4NjAzODczOQ",
        text: "Winter has finally come. I can't believe this is the final season!",
        likeCount: 8432,
        publishedAt: "2019-03-05T16:42:21Z",
        authorDisplayName: "WinterIsComing",
        authorProfileImageUrl:
          "https://yt3.ggpht.com/ytc/AAUvwniXKJ-7RVQvPbcRcRmvqXkrEz_XM7JdFMw5mQ=s48-c-k-c0xffffffff-no-rj-mo",
      },
      {
        id: "UgxNTc2MzcwMDE5ODI5Mzk5Njg",
        text: "That shot of the dragons flying over Winterfell gave me chills! Can't wait for April 14th!",
        likeCount: 5678,
        publishedAt: "2019-03-05T17:12:45Z",
        authorDisplayName: "DragonQueen",
        authorProfileImageUrl:
          "https://yt3.ggpht.com/ytc/AAUvwnhXY7uFXGaJQxwF1O1k9T7UPDyUm7M5Sw3W=s48-c-k-c0xffffffff-no-rj-mo",
      },
    ],
  };

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
    <div className="sm:w-[480px] mb-6 md:w-80  cursor-pointer">
      <div className="relative w-full mb-2 overflow-hidden rounded-lg">
        <img
          className="w-full aspect-auto object-cover"
          src={data.snippet.thumbnails.maxres.url}
          alt={data.snippet.title}
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
          {data.contentDetails.duration
            .replace("PT", "")
            .replace("M", ":")
            .replace("S", "")}
        </div>
      </div>

      <div className="flex gap-2">
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
            <button className="text-gray-500 hover:text-gray-700 p-1">
              <BsThreeDotsVertical />
            </button>
          </div>

          <div className="flex flex-col text-xs text-gray-500">
            <span className="hover:text-black">
              {data.snippet.channelTitle}
            </span>
            <span>
              {formatViews(data.statistics.viewCount)} views •
              {new Date(data.snippet.publishedAt).toLocaleDateString(
                undefined,
                { year: "numeric", month: "short", day: "numeric" }
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeVideoCard;
