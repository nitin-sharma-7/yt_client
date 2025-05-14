import React, { useEffect, useState } from "react";
import MainVideo from "./MainVideo";
import SideVideo from "./SideVideo";
import { NavLink, useParams } from "react-router";

function MainVideoPage() {
  const { videoID } = useParams();
  const [mainVideo, setMainVideo] = useState({});
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:3000/videos");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const videos = await response.json();

        // Find the main video by ID
        const currentVideo = videos.find((video) => video._id == videoID);
        if (currentVideo) {
          setMainVideo(currentVideo);
        } else {
          throw new Error("Video not found");
        }

        // Set all videos for the sidebar
        setRecommendedVideos(videos);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideos();
  }, [videoID]);

  return (
    <div className="mt-20 md:flex px-4 gap-3">
      <div className="md:w-[60%]">
        {Object.keys(mainVideo).length > 0 && <MainVideo data={mainVideo} />}
      </div>
      <div className="md:w-[40%] flex flex-col gap-3">
        {recommendedVideos
          .filter((video) => video._id !== videoID) // Filter out the current video
          .map((video) => (
            <NavLink key={video._id} to={`/video/${video._id}`}>
              <SideVideo data={video} />
            </NavLink>
          ))}
      </div>
    </div>
  );
}

export default MainVideoPage;
