import React, { useEffect, useState } from "react";
import MainVideo from "./MainVideo";
import SideVideo from "./SideVideo";
import { NavLink, useParams, useSearchParams } from "react-router";
import { youtubeVideosData } from "../../data/data";

function MainVideoPage() {
  const { videoID } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const [filterdData] = youtubeVideosData.filter((val) => val.id == videoID);
    setData(filterdData);
  }, [videoID]);
  return (
    <div className="mt-20  md:flex px-4 gap-3">
      {/* data is object so data&& dosomething wont work  */}
      <div className=" md:w-[60%]">
        {Object.keys(data).length && <MainVideo data={data} />}
      </div>
      <div className="md:w-[40%] flex flex-col gap-3 ">
        {youtubeVideosData.map((val, i) => {
          return (
            <NavLink key={val.id} to={`/video/${val.id}`}>
              <SideVideo data={val} />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default MainVideoPage;
