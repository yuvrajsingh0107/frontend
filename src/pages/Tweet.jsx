import { useContext, useEffect, useState } from "react"
import TweetForm from "../components/TweetForm"
import { AuthContext } from "../context/AuthContext"
import LoginForm from "../components/LoginForm";
import ProfileCard from "../components/ProfileCard";
import TweetCard from "../components/TweetCard";
import { getTweetFeed } from "../utils/api";

function Tweet() {

  // const {user} = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const { user } = useContext(AuthContext);
  const [tweetForm, setTweetForm] = useState(false);
  const [addTweetButton, setAddTweetButton] = useState(true);


  useEffect(() => {
    async function getTweet() {
      console.log("in use effect")
      console.log(user?._id)
      const res = await getTweetFeed(page, user?._id)
      // console.log(res)
      if (res) {
        setTweets([...tweets, ...res.data.data])
      }
      console.log(res.data);
    }
    getTweet();
  }, [user, page])


  return (
    <>
      {
        tweetForm &&
        <>
          {/* <div className="w-full h- absolute z-60 bg-red-800"></div> */}
          <TweetForm setTweetForm={setTweetForm} setTweets={setTweets} />
        </>
      }
      <div className=' sticky top-0 min-h-screen w-screen h-1111 flex'>
        <div className='w-1/4 hidden md:block '>
          {
            user &&
            <ProfileCard />
            ||
            <div className="sticky top-0 w-9/10 h-screen text-gray-100 font-bold text-center flex items-center justify-center bg-gray-700">
              Login to Post
            </div>
          }
        </div>



        <div className='bg-gray-900 w-screen  md:w-2/4 mt-4 flex flex-col gap-3 '>
          {
            tweets &&
            <>

              <div>
                {
                  addTweetButton &&
                <button
                onClick={() => {setTweetForm(!tweetForm); setAddTweetButton(false)}}
                className="sm:hidden self-end mx-5 mb-2 px-5 py-1 rounded-2xl text-white  bg-blue-600 "
                >
                  AddTweet
                </button>
                ||

                <button
                onClick={() =>  {setTweetForm(!tweetForm); setAddTweetButton(true)}}
                className="sm:hidden self-end mx-5 mb-2 px-5 py-1 rounded-2xl text-white  bg-blue-600 "
                >
                  close form
                </button>


                }

              </div>

              {
                tweets.map((tweet) => <TweetCard key={tweet._id} tweet={tweet} />)
              }
            </>
          }
          <p
            onClick={() => { setPage(page + 1) }}
            className="text-white">load more ....</p>
        </div>
        <div className='hidden sm:block sm:w-2/3 md:w-1/4 '>
          {
            user &&
            <TweetForm setTweets={setTweets} />
            ||
            <LoginForm next="/tweet" />
          }
        </div>

      </div>
    </>
  )
}

export default Tweet
