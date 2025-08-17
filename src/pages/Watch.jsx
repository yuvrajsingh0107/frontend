import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { addComment, fetchVideoById, getComments, toggelLikeVideo } from "../utils/api"; // Axios instance
import { AuthContext } from "../context/AuthContext";
// import CommentSection from "../components/CommentSection"; // Make later

export default function Watch() {

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [commentPage, setCommentsPage] = useState(1);

  useEffect(() => {
    fetchVideoById(id)
      .then(res => {
        setVideo(res.data);
        // setComments(res.data.comments || []);
        setLikes((res.data.likes || 0));
        console.log("res.data", res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
      getComments(id,commentPage)
      .then(res => {
        setComments(res.data.data);
        console.log("comments : ", res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  // useEffect(() => {}, [likes])

  async function handleSubmit(e) {
    // Handle comment submission
    e.preventDefault()

    // console.log(newComment)
    const data = {
      content: newComment,
      videoId: video?._id || "",
      userId: user?._id || ""
    }
    setNewComment("");
    // console.log(data)
    const res = await addComment(data);
    if (res.status !== 201) {
      throw new Error("Failed to add comment");
    }
    const updatedComments = await getComments(id, 1);
    setComments(updatedComments.data.data);
    setCommentsPage(1)
    console.log("comments : ", updatedComments)

    // setComments(updatedComments);


    console.log(res);
  }

  async function toggleLike(e) {
    console.log("toggleLike called");
    const res = await toggelLikeVideo(video._id);
    console.log("like res ", typeof (res.data))
    console.log("like res ", res.data)
    if (res.data.data.like) {
      setLikes((prev) => prev + 1)
    } else {
      console.log("in else :", res.data.like)
      setLikes((prev) => prev - 1)
    }
    console.log("like toggled");
    // setLikes();
  }
  // console.log("video : ", video);


  const loadMoreComments = async () => {
    const res = await getComments(id, commentPage + 1);
    setComments((prev) => [...prev, ...res.data.data]);
    setCommentsPage((prev) => prev + 1);
  }








  if (loading) {
    return <p className="text-center bg-gray-900 mt-10 text-lg">Loading video...</p>;
  }

  if (!video) {
    return <p className="text-center bg-gray-900 mt-10 text-red-500">Video not found</p>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">

      <div className=" w-full xl:max-w-6xl bg-gray-800 mx-auto">
        {/* Video Player */}
        <div className="aspect-auto w-full sm:flex sm:items-start sm:justify-center ">
          {/* <p className="text-white">video id : {video.videoFile}</p> */}
          {/* <video src="https://res.cloudinary.com/dixsg9gz0/video/upload/v1754501521/rvlhnilvsynwhkmtvdw6.mp4" controls /> */}

          <ReactPlayer
            src={video.videoFile}
            controls={true}
            // autoplay nahi
            width="auto"
            height="90%"
            style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", borderBottomLeftRadius: "1rem", borderBottomRightRadius: "1rem", border: "2px solid #e5e7eb" }}
            className="rounded-2xl  overflow-hidden max-w-full sm:w-auto sm:h-[500px] xl:max-w-4xl"
          // style={{ maxWidth: "100%", height: "100%" }}
          />
        </div>

        {/* Video Details */}
        <div className="p-8">
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {video.title}
          </h1>
          <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 mt-1">
            <p>
              {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
            </p>
            <button
              onClick={() => toggleLike()}
              className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              👍 {likes}
            </button>
          </div>
          <div className="w-full h-px bg-amber-50 mt-10"></div>
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
                    className="p-3 bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-6">
                      <img src={comment.owner.avatar} className="w-7 h-7 rounded-full" alt="" />
                      <div>
                        <p>{comment.content}</p>
                        <p className="text-sm text-gray-400 font-bold">{comment.owner?.userName || "User"}</p>
                      </div>

                    </div>

                  </div>
                ))}
              </div>

              <div>
                <button onClick={loadMoreComments}>
                  Load More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
