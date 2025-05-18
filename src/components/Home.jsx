import React, { useState, useEffect } from "react";
import HomeVideoCard from "./videocards/HomeVideoCard";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import findTags from "../utils/findTags.js";
import { addSearch } from "../slices/searchSlice.js";
import ShimmerVideoCard from "./videocards/ShimmerVideoCard.jsx";
import { URL } from "../URL.js";

function Home() {
  // Get current search term from Redux store
  const search = useSelector((store) => store.search.searchItem);
  // State for all videos fetched from API
  const [videos, setVideos] = useState([]);
  // State for videos filtered by search term
  const [filteredVideos, setFilteredVideos] = useState([]);
  const dispatch = useDispatch();

  // First useEffect: Fetch videos from API when component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${URL}/videos`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Initialize both states with the full video list
        setVideos(data);
        setFilteredVideos(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideos();
  }, []); // Empty dependency array means this runs once on mount

  // Second useEffect: Filter videos when search term or video list changes
  useEffect(() => {
    // Skip filtering if no videos are loaded yet
    if (!videos.length) return;

    // First attempt: Filter by video title (case-insensitive)
    let filtered = videos.filter((val) =>
      val.snippet.title.toLowerCase().includes(search.toLowerCase())
    );

    // If no matches by title, try filtering by tags as fallback
    // This creates a two-tiered search priority system
    if (filtered.length === 0) {
      filtered = videos.filter(
        (val) => val.snippet.tags && val.snippet.tags.includes(search)
      );
    }

    setFilteredVideos(filtered);
  }, [search, videos]); // Re-run when search term or videos list changes

  return (
    <>
      {/* Horizontal scrolling tag filter bar */}
      <div className="flex flex-grow mt-20 px-4 md:px-8 sm:ml-16 md:ml-20 overflow-x-scroll scrollbar-hide whitespace-nowrap sticky top-14 py-2 z-10 bg-white">
        {/* "All" filter button - resets search to empty string */}
        <div
          onClick={() => dispatch(addSearch(""))}
          className={`border-2 rounded px-3 py-1 mr-2 flex-shrink-0 cursor-pointer ${
            search == "" ? "active-bg" : ""
          }`}
        >
          All
        </div>
        {/* Dynamic tag filters generated from video metadata 
            The findTags utility extracts unique tags from all videos */}
        {findTags(filteredVideos).map(
          (tag, i) =>
            tag != "" && (
              <div
                className={`border-2 rounded px-3 py-1 mr-2 flex-shrink-0 cursor-pointer ${
                  tag.toLowerCase() == search.toLowerCase() ? "active-bg" : ""
                } `}
                key={i}
                onClick={() => {
                  dispatch(addSearch(tag));
                }}
              >
                {tag}
              </div>
            )
        )}
      </div>

      {/* Video grid layout with responsive columns based on screen size */}
      <div className="flex justify-center mt-4 px-4 md:px-8 sm:ml-16 md:ml-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-10">
          {/* Conditional rendering: show videos if available, otherwise show loading shimmer placeholders */}
          {filteredVideos.length
            ? filteredVideos.map((video) => (
                <HomeVideoCard data={video} key={video._id} />
              ))
            : Array(10)
                .fill(null)
                .map((_, i) => <ShimmerVideoCard key={i} />)}
        </div>
      </div>
    </>
  );
}

export default Home;
