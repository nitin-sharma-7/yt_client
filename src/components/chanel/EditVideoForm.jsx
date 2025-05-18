import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { URL } from "../../URL.js";
function EditVideoForm() {
  // State to hold video data with default empty values
  const [video, setVideo] = useState({
    title: "",
    description: "",
    maxres: "",
    tags: "",
    duration: "",
  });
  // Extract the video ID from URL parameters
  const { id } = useParams();

  // Handle form input changes by updating only the specific field while preserving other data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const notify = (x) => toast(x);
  // Get authenticated user data from Redux store
  const user = useSelector((store) => store.user.item);

  const navigate = useNavigate();

  // Effect hook to fetch video data when component mounts or ID changes
  useEffect(() => {
    async function getVideo() {
      try {
        // Fetch video data from API using authentication token
        const { data: res } = await axios.get(`${URL}/video/${id}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `token ${user.token}`,
          },
        });

        // If video data exists, update state with its properties
        // Handles potential undefined values with fallbacks using logical OR
        if (res) {
          setVideo({
            title: res.snippet.title || "",
            description: res.snippet.description || "",
            maxres: res.snippet.thumbnails.maxres.url || "",
            tags: res.snippet.tags || "",
            duration: res.contentDetails.duration || "",
          });
        }
      } catch (error) {}
    }
    getVideo();
  }, [id]);

  // Handle form submission to update video data
  async function handleUpdate(e) {
    e.preventDefault(); // Prevent page reload

    try {
      // Send PUT request to update video with current form data
      // Note: Authorization header uses 'channelDataRes' prefix instead of 'token'
      const { data: res } = await axios.put(
        `${URL}/video/update/${id}`,
        {
          title: video.title,
          description: video.description,
          maxres: video.maxres,
          tags: video.tags,
          duration: video.duration,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `channelDataRes ${user.token}`,
          },
        }
      );
      // Show success toast message only if user is authenticated
      user.token && notify(res.message);

      // Redirect to home page after successful update
      navigate("/");
    } catch (error) {
      console.log("Update Error:", error);
    }
  }
  return (
    <div className="mt-20 max-w-xl mx-auto p-4 border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4"> Update Video</h2>
      <form onSubmit={(e) => handleUpdate(e)} className="flex flex-col gap-4">
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

export default EditVideoForm;
