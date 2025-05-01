import React, { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaArrowDown } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";

function MainVideo({ data }) {
  const [showComents, setShowComents] = useState(false);
  const [more, setMore] = useState(false);
  const [comment, setComment] = useState("");

  const countSimple = (subs) => {
    if (subs >= 1000000000) return (subs / 1000000000).toFixed(2) + " B";
    else if (subs >= 1000000) return (subs / 1000000).toFixed(2) + " M";
    else if (subs >= 1000) return (subs / 1000).toFixed(2) + " K";
    else return subs;
  };

  return (
    <>
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Video Player */}
        <div className="w-full relative aspect-video bg-black rounded-lg overflow-hidden">
          {/* <img
            src={data.snippet.thumbnails.maxres.url}
            alt={data.snippet.title}
            className="w-full h-full object-cover"
          /> */}

          <iframe
            className="w-full h-full object-cover"
            src={data.videoLink}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
            {data.contentDetails.duration
              .replace("PT", "")
              .replace("M", ":")
              .replace("S", "")}
          </div>
        </div>

        {/* Video Title */}
        <h1 className="text-xl font-bold mt-3 mb-2">{data.snippet.title}</h1>

        {/* Video Info Bar */}
        <div className="flex flex-wrap justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2 md:mb-0">
            <img
              src={data.snippet.thumbnails.default.url}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-medium">{data.snippet.channelTitle}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {countSimple(data.statistics.subscribers)} subscribers
              </span>
            </div>
            <button className="ml-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full px-4 py-2 text-sm">
              Subscribe
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <button className="flex items-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                <span className="mr-2">
                  <AiOutlineLike />
                </span>
                <span>{countSimple(data.statistics.likeCount)}</span>
              </button>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
              <button className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                <span>
                  <AiOutlineDislike />
                </span>
              </button>
            </div>

            <button className=" hidden sm:flex sm:items-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full px-3 py-2">
              <span className="mr-2">
                <IoMdShareAlt />
              </span>
              <span>Share</span>
            </button>

            <button className=" hidden sm:flex sm:items-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full px-3 py-2">
              <span className="mr-2">
                {" "}
                <FaArrowDown />
              </span>
              <span>Download</span>
            </button>

            <button className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full w-10 h-10">
              <span>
                <BsThreeDots />
              </span>
            </button>
          </div>
        </div>

        {/* Video Description */}
        <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
          <div className="flex space-x-3 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>{countSimple(data.statistics.viewCount)} views</span>
            <span>
              {new Date(data.snippet.publishedAt).toLocaleDateString()}
            </span>
          </div>

          <div className="mb-2 flex flex-wrap gap-1">
            {data.snippet.tags.map((tag, i) => (
              <span
                key={i}
                className="text-blue-500 hover:text-blue-800 text-sm mr-1"
              >
                #{tag}
              </span>
            ))}
          </div>
          {more ? (
            <div>{data.snippet.description + data.snippet.description}</div>
          ) : (
            ""
          )}

          <p className="text-sm">
            {data.snippet.description}{" "}
            <button
              onClick={() => setMore(!more)}
              className="font-medium text-gray-600 dark:text-gray-400"
            >
              {!more ? "...more" : "show less"}
            </button>
          </p>
        </div>
        {/* for comments show */}
        <div className="py-2  flex gap-4">
          <h2 className="font-bold">
            {countSimple(data.statistics.commentCount)} Comments
          </h2>
          <h2
            onClick={() => setShowComents(!showComents)}
            className="cursor-pointer"
          >
            {showComents ? "Hide Comments ▲" : "Show Comments ▼"}
          </h2>
        </div>

        {/* for adding a comment */}
        <div className="flex items-center pb-2 border-b-2 mb-2 gap-4">
          <img
            src={data.snippet.thumbnails.maxres.url}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            className="focus:outline-none"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          />
        </div>
        {/* Comments Section */}
        {showComents ? (
          <div className="mt-6">
            <button className="ml-4 flex items-center text-sm">
              <span className="mr-2">Sort by</span>
              <span>▼</span>
            </button>

            {/* Comment Items */}
            {data.comments.map((comment, i) => (
              <div key={i} className="flex space-x-3 mb-4">
                <img
                  src={comment.authorProfileImageUrl}
                  alt=""
                  className="w-8 h-8 rounded-full mt-2"
                />
                <div>
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2">
                      {comment.authorDisplayName}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(comment.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mb-1">{comment.text}</p>
                  <div className="flex items-center text-sm space-x-4">
                    <button className="flex items-center">
                      <span className="mr-1">
                        <AiOutlineLike />
                      </span>
                      <span>{countSimple(comment.likeCount)}</span>
                    </button>
                    <button className="flex items-center">
                      <span>
                        <AiOutlineDislike />
                      </span>
                    </button>
                    <button className="text-gray-500 dark:text-gray-400">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default MainVideo;
