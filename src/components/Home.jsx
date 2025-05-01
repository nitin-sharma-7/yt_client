import React, { useState, useEffect } from "react";
import HomeVideoCard from "./videocards/HomeVideoCard";
import { youtubeVideosData } from "../data/data.js";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import findTags from "../utils/findTags.js";
import { addSearch } from "../slices/searchSlice.js";

function Home() {
  const search = useSelector((store) => store.search.searchItem);
  // console.log(search);
  const [datas, setDatas] = useState(youtubeVideosData);
  const dispatch = useDispatch();
  useEffect(() => {
    let filtered = youtubeVideosData.filter((val) =>
      val.snippet.title.toLowerCase().includes(search.toLowerCase())
    );
    if (filtered.length == 0) {
      filtered = youtubeVideosData.filter((val) =>
        val.snippet.tags.includes(search)
      );
    }

    setDatas(filtered);
  }, [search]);
  return (
    <>
      <div className="flex flex-grow mt-20 px-4 md:px-8 sm:ml-16 md:ml-20 overflow-x-scroll scrollbar-hide whitespace-nowrap sticky top-14 py-2 z-10 bg-white">
        {findTags().map((tag, i) => (
          <div
            className="border-2 rounded px-3 py-1 mr-2 flex-shrink-0"
            key={i}
            onClick={() => {
              dispatch(addSearch(tag));
            }}
          >
            {tag}
          </div>
        ))}
      </div>

      <div className=" flex justify-center mt-4 px-4 md:px-8 sm:ml-16 md:ml-20 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-6 lg:gap-10">
          {datas.length ? "" : <>not found</>}
          {datas.map((data, i) => {
            return (
              <NavLink to={`/video/${data.id}`} key={data.id}>
                <HomeVideoCard data={data} />
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
