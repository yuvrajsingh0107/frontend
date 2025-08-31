import React, { useContext, useState } from 'react';
import { updateComment, deleteComment } from '../utils/api';
import ErrorMessage from "../components/ErrorMessage"
import { AuthContext } from '../context/AuthContext';
import deletebutton from '../assets/delete-button-svgrepo-com.svg';
import Warning from './Warning';

const CommentBox = ({ comment, setComments }) => {

  const [contentVisiblity, setContentVisiblity] = useState(true);
  const [buttonContent, setButtonContent] = useState("Edit")
  const [content, setContent] = useState(comment.content);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const [DeleteComment, setDeleteComment] = useState(false);



  async function deleteCommentFun() {
    try {
      const res =await deleteComment(comment._id, user._id);
      setComments((prev) => (
        prev.filter(thisComment => comment._id != thisComment._id)
      ))
    } catch (error) {
      setError(error.message)
    }
  }


  const handelEdit = async () => {
    if (buttonContent == "Edit") {
      setButtonContent("Change");
      setContentVisiblity(false)

    } else {
      const url = window.location.href.split("/");
      const videoId = url[url.length - 1];
      const data = {
        content: content,
        videoId: videoId || "",
        userId: user?._id || ""
      }
      // console.log(data)
      try {
        const res = await updateComment(comment._id, data, user.accessToken)
      } catch (error) {
        setError(error.message);
      }
      setButtonContent("Edit");
      setContentVisiblity(true)
    }
  }
  return (
    <>
      <div
        key={comment._id}
        className="p-3 bg-gray-700 rounded-lg"
      >
        {error &&
          <ErrorMessage message={error} setError={setError} />
        }
        <div className='flex justify-between items-center'>
          <div className="flex items-center gap-6">
            <img src={comment.owner.avatar} className="w-7 h-7 rounded-full" alt="" />
            <div>
              {contentVisiblity &&
                <p >{content}</p>
              }
              {
                !contentVisiblity &&
                <input
                  type="text"
                  className="flex-1 border rounded-lg px-3 py-0 outline-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              }
              <p className="text-sm text-gray-400 font-bold">{comment.owner?.userName || "User"}</p>
            </div>
          </div>
          {user?._id == comment.owner._id &&
            <div className='flex items-center gap-4'>
              <button
                className=' px-7 py-1 rounded bg-blue-500 hover:bg-blue-300'
                onClick={handelEdit}
              >
                {buttonContent}
              </button>
              <button
                onClick={() => setDeleteComment(true)}
                className='px-2 py-1.5 rounded  bg-red-300 flex justify-center hover:bg-red-100'
              >
                <img src={deletebutton} alt="" />
              </button>

            </div>}
        </div>
        {
          DeleteComment &&
          <Warning message="Conferm delete this comment!" deleteComment={deleteCommentFun} cancel={() => setDeleteComment(false)} />
        }
      </div>
    </>
  );
}

export default CommentBox;
