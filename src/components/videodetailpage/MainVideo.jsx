import axios from "axios";
import { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { FaArrowDown } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { URL } from "../../URL.js";

function MainVideo({ data }) {
  const [showComents, setShowComents] = useState(false);
  const [more, setMore] = useState(false);
  const [comment, setComment] = useState("");
  const [model, setModel] = useState(null);
  const notify = (x) => toast(x);
  const countSimple = (subs) => {
    if (subs >= 1000000000) return (subs / 1000000000).toFixed(2) + " B";
    else if (subs >= 1000000) return (subs / 1000000).toFixed(2) + " M";
    else if (subs >= 1000) return (subs / 1000).toFixed(2) + " K";
    else return subs;
  };
  const user = useSelector((store) => store.user.item);
  async function handlePost() {
    const commentData = {
      comment,
      videoId: data._id,
      owner: user?.newuser?._id,
    };
    try {
      const { data: res } = await axios.post(
        `${URL}/comment/create`,
        commentData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `x ${user.token}`,
          },
        }
      );

      user.token ? notify(res.message) : notify("Plese signin to comment ");
    } catch (error) {
      // handle error here
      console.log("error", error.message);
    }
    setComment("");
  }
  async function handleDelete(x) {
    try {
      const { data: res } = await axios.delete(`${URL}/comment/delete`, {
        data: { commentId: x, videoId: data._id },
        headers: {
          "Content-Type": "application/json",
          authorization: `x ${user.token}`,
        },
      });
      user.token
        ? notify(" comment deleted sucessfully")
        : notify("Plese signin first");
    } catch (error) {
      console.log("error", error.response?.data || error.message);
    }
    setModel(null);
  }

  function handleUpdate(x, y) {
    handleDelete(x);
    setComment(y);
    setModel(null);
  }

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
        <Toaster
          toastOptions={{
            duration: 2000,
            removeDelay: 1000,
            style: {
              fontWeight: "bold",
              background: "white",
              color: "black",
            },
          }}
        />
        {/* Video Title */}
        <h2 className="text-xl font-bold mt-3 mb-2">{data.snippet.title}</h2>

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
          <div className="flex flex-wrap space-x-3 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>{countSimple(3424324)} views</span>
            <span>
              {new Date(
                data.publishedAt || data.createdAt
              ).toLocaleDateString()}
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
            src={user?.newuser?.avatar}
            alt={user?.newuser?.username}
            className="w-10 h-10 rounded-full border-2 border-red-600"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            className="focus:outline-none w-full "
            onChange={(e) => {
              setComment(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handlePost();
              }
            }}
            value={comment}
          />
          {comment.length ? (
            <div
              className="ml-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full px-2 py-1 text-sm"
              onClick={() => handlePost()}
            >
              post
            </div>
          ) : (
            ""
          )}
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
              <div key={i} className="flex space-x-3 mb-4  ">
                <img
                  src={comment.owner.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full mt-2 border-red-600 border-2"
                />
                <div>
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2">
                      {comment.owner.username}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mb-1">{comment.comment}</p>
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
                <div className="relative mt-1">
                  <div
                    className="cursor-pointer p-1 hover:bg-gray-200 rounded-full transition"
                    onClick={() =>
                      model == null ? setModel(i) : setModel(null)
                    }
                  >
                    <BsThreeDotsVertical className="text-xl text-gray-600" />
                  </div>

                  {model === i && (
                    <div className="absolute -top-4 -right-28 mt-6 w-28 bg-white border rounded-lg shadow-lg z-10 flex flex-col">
                      <button
                        onClick={() =>
                          handleUpdate(comment._id, comment.comment)
                        }
                        className="px-4 py-2 text-left hover:bg-green-100 transition text-sm text-gray-700"
                      >
                        <CiEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="px-4 py-2 text-left hover:bg-red-100 transition text-sm text-red-600"
                      >
                        <MdDeleteOutline />
                        Delete
                      </button>
                    </div>
                  )}
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
