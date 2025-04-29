import React from "react";
import MainVideo from "./MainVideo";
import SideVideo from "./SideVideo";

function MainVideoPage() {
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
  return (
    <div className="mt-20  sm:flex px-4 gap-3">
      <div className=" sm:w-[65%]">
        <MainVideo data={data} />
      </div>
      <div className="sm:w-[35%] flex flex-col gap-3 ">
        <SideVideo />
        <SideVideo />
        <SideVideo />
        <SideVideo />
        <SideVideo />
        <SideVideo />
        <SideVideo />
        <SideVideo />
        <SideVideo />
        <SideVideo />
        <SideVideo />
        <SideVideo />
        <SideVideo />
      </div>
    </div>
  );
}

export default MainVideoPage;
