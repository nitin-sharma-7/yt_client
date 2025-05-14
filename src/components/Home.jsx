import React, { useState, useEffect } from "react";
import HomeVideoCard from "./videocards/HomeVideoCard";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import findTags from "../utils/findTags.js";
import { addSearch } from "../slices/searchSlice.js";

function Home() {
  const search = useSelector((store) => store.search.searchItem);
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const dispatch = useDispatch();

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:3000/videos");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setVideos(data);
        setFilteredVideos(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideos();
  }, []);

  // Filter videos based on search
  useEffect(() => {
    if (!videos.length) return;

    let filtered = videos.filter((val) =>
      val.snippet.title.toLowerCase().includes(search.toLowerCase())
    );

    if (filtered.length === 0) {
      filtered = videos.filter(
        (val) => val.snippet.tags && val.snippet.tags.includes(search)
      );
    }

    setFilteredVideos(filtered);
  }, [search, videos]);

  return (
    <>
      <div className="flex flex-grow mt-20 px-4 md:px-8 sm:ml-16 md:ml-20 overflow-x-scroll scrollbar-hide whitespace-nowrap sticky top-14 py-2 z-10 bg-white">
        {findTags(filteredVideos).map((tag, i) => (
          <div
            className="border-2 rounded px-3 py-1 mr-2 flex-shrink-0 cursor-pointer"
            key={i}
            onClick={() => {
              dispatch(addSearch(tag));
            }}
          >
            {tag}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 px-4 md:px-8 sm:ml-16 md:ml-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-10">
          {filteredVideos.length ? (
            filteredVideos.map((video) => (
              <NavLink to={`/video/${video._id}`} key={video._id}>
                <HomeVideoCard data={video} />
              </NavLink>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              No videos found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
