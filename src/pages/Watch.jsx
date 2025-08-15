import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { fetchVideoById } from "../utils/api"; // Axios instance
// import CommentSection from "../components/CommentSection"; // Make later

export default function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchVideoById(id)
      .then(res => {
        setVideo(res.data);
        setComments(res.data.comments || []);
        console.log("res.data", res.data);

        setLoading(false);
      })
      .catch(() => setLoading(false));

  }, [id]);

  function handleSubmit(e) {
    // Handle comment submission
    e.preventDefault()
    // console.log(e)

  }
  console.log("video : ",video);

  if (loading) {
    return <p className="text-center bg-gray-900 mt-10 text-lg">Loading video...</p>;
  }

  if (!video) {
    return <p className="text-center bg-gray-900 mt-10 text-red-500">Video not found</p>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen text-gray-900 dark:text-gray-100">

      <div className="max-w-6xl bg-gray-900 mx-auto p-4">
        {/* Video Player */}
        <div className="aspect-video bg-black">
          {/* <p className="text-white">video id : {video.videoFile}</p> */}
          {/* <video src="https://res.cloudinary.com/dixsg9gz0/video/upload/v1754501521/rvlhnilvsynwhkmtvdw6.mp4" controls /> */}

        <ReactPlayer
          src={video.videoFile}
          controls={true}
          playing={false} // autoplay nahi
          width="100%"
          height="auto"
        />
      </div>

      {/* Video Details */}
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        {video.title}
      </h1>
      <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 mt-1">
        <p>
          {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
        </p>
        <button className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition">
          👍 Like
        </button>
      </div>
      <p className="mt-3 text-gray-700 dark:text-gray-300">{video.description}</p>

      {/* Comment Section */}
      <div className="mt-6">
       <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Comments ({comments.length})
      </h2>

      {/* Comment Form */}
      <form onSubmit={(e) => handleSubmit(e)} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      {/* Comment List */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="p-3 bg-gray-100 rounded-lg"
          >
            <p className="text-sm font-semibold">{comment.user?.username || "User"}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
      </div>
    </div>
    </div>
  );
}
