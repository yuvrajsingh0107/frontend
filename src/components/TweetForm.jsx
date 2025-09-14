import { useContext, useState } from 'react'
import { postTweet } from '../utils/api';
import { AuthContext } from '../context/AuthContext';

function TweetForm({ setTweetForm, setTweets }) {

  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  


  const [Posting, setPosting] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(() => {
        return value
      });
    } else if (name === "content") {
      setContent(() => value);
    }
  }

  const handleSubmit = async () => {
    setPosting(true);
    try {
      const res = await postTweet({ title: title, content: content }, user.accessToken)
      const tweet = res.data.data;
      tweet["owner"] = {
        avatar: user.avatar,
        fullName: user.fullName
      }
      setTweets((prev) => [tweet, ...prev])
    } catch (error) {
      console.log(error)
    } finally {
      setTitle("");
      setContent("");
      setTweetForm(false);
      setPosting(false);
    }
  }


  return (
    <>
      <div className='sticky  top-2 right-2 w-full m-3 mr-4 rounded-lg bg-gray-800 text-gray-100 border-2 border-gray-300'>
        <div className='flex flex-col gap-10 py-15  items-center' >
          <label
            className='text-4xl font-bold'
          >
            Add Tweet
          </label>
          <input
            name="title"
            className='w-9/10  p-2 border border-gray-400 bg-gray-600 text-gray-100'
            type="text"
            value={title}
            onChange={(event) => handleChange(event)}
            placeholder='Think a heading'
          />
          <div className='w-9/10 p-2'>

            <textarea
              name="content"
              className='w-full h-50  border border-gray-400 bg-gray-600 text-gray-100'
              placeholder='Whats in Your mind?'
              value={content}
              onChange={(event) => handleChange(event)}
            />
            {
              Posting &&
              <p > Posting .....</p>
            }
          </div>
          <button onClick={(event) => handleSubmit(event)} type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>Post</button>
        </div>
      </div>
    </>
  )
}

export default TweetForm
