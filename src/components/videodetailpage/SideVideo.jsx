import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function SideVideo() {
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

  const countSimple = (subs) => {
    if (subs >= 1000000000) return (subs / 1000000000).toFixed(2) + " B";
    else if (subs >= 1000000) return (subs / 1000000).toFixed(2) + " M";
    else if (subs >= 1000) return (subs / 1000).toFixed(2) + " K";
    else return subs;
  };
  return (
    <div className="flex gap-2 group hover:bg-gray-100 cursor-pointer rounded-lg w-full max-w-md">
      {/* Thumbnail with duration */}
      <div className="relative w-60  ">
        <img
          src={data.snippet.thumbnails.maxres.url}
          alt={data.snippet.title}
          className="w-full h-full object-fill rounded"
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
          {data.contentDetails.duration
            .replace("PT", "")
            .replace("M", ":")
            .replace("S", "")}
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
          <span>{countSimple(data.statistics.viewCount)} views</span>
          <span className="mx-1">•</span>
          <span>
            {new Date(data.snippet.publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SideVideo;
