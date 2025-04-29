import React from "react";
import Header from "./header/Header";
import HomeVideoCard from "./videocards/HomeVideoCard";

function Home() {
  return (
    <>
      <div className=" flex justify-center mt-20 px-4 md:px-8 sm:ml-16 md:ml-20 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4  gap-6 lg:gap-10">
          <HomeVideoCard />
          <HomeVideoCard />
          <HomeVideoCard />
          <HomeVideoCard />
          <HomeVideoCard />
          <HomeVideoCard />
          <HomeVideoCard />
          <HomeVideoCard />
        </div>
      </div>
    </>
  );
}

export default Home;
