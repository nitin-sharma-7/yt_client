import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { URL } from "../../URL.js";
function VideoForm() {
  const [video, setVideo] = useState({
    title: "",
    description: "",
    maxres: "",
    tags: "",
    duration: "",
    videoLink: "",
  });
  const notify = (x) => toast(x);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const user = useSelector((store) => store.user.item);
  const channel = useSelector((store) => store.channel.item);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedVideo = {
      ...video,
      tags: video.tags.split("#").map((tag) => tag.trim()),
    };
    console.log("Submitted Video:", {
      formattedVideo,
      channelId: channel.newChannel._id,
      channelTitle: channel.newChannel.channelName,
    });
    // You can POST this `formattedVideo` object to your backend
    post({
      formattedVideo,
      channelId: channel.newChannel._id,
      channelTitle: channel.newChannel.channelName,
    });
    setVideo({
      title: "",
      description: "",
      maxres: "",
      tags: "",
      duration: "",
      videoLink: "",
    });
  };
  const navigate = useNavigate();
  async function post(data) {
    try {
      const { data: res } = await axios.post(`${URL}/video`, data, {
        headers: {
          "Content-Type": "application/json",
          authorization: `x ${user.token}`,
        },
      });
      if (res) {
        notify("Video uploaded sucessfully");
        navigate("/");
      }
      console.log(res);
    } catch (error) {
      // handle error here
      console.log("error", error.message);
    }
  }
  return (
    <div className="mt-20 max-w-xl mx-auto p-4 border rounded-md shadow-md">
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
      <h2 className="text-2xl font-bold mb-4">Add New Video</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={video.title}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={video.description}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            rows="3"
            required
          />
        </label>

        <label>
          Max Resolution Thumbnail URL:
          <input
            type="text"
            name="maxres"
            value={video.maxres}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </label>

        <label>
          Tags (comma separated):
          <input
            type="text"
            name="tags"
            value={video.tags}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </label>

        <label>
          Duration (e.g., PT2M20S):
          <input
            type="text"
            name="duration"
            value={video.duration}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </label>

        <label>
          Video Link:
          <input
            type="text"
            name="videoLink"
            value={video.videoLink}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </label>

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default VideoForm;
