import { useContext, useEffect, useState } from "react"
import TweetForm from "../components/TweetForm"
import { AuthContext } from "../context/AuthContext"
import LoginForm from "../components/LoginForm";
import ProfileCard from "../components/ProfileCard";
import TweetCard from "../components/TweetCard";
import { getTweetFeed } from "../utils/api";

function Tweet() {
  

  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {user} = useContext(AuthContext);


  useEffect(() => {
    async function  getTweet() {
      console.log("in use effect")
      const res =  await getTweetFeed(page)
      // console.log(res)
      if(res){
        setTweets(res.data.data)
      }
      console.log(res.data);
    }
    getTweet();
  },[])
  
  return (
    <>
    <div className='sticky top-0 min-h-screen w-screen h-1111 flex'>
      <div className='w-1/4 '>
      {
        user &&
          <ProfileCard />
        ||
        <div className="sticky top-0 w-9/10 h-screen text-gray-100 font-bold text-center flex items-center justify-center bg-gray-700">
         Login to Post
         </div>
      }
      </div>
      <div className=' w-screen md:w-2/4 mt-4 flex flex-col gap-3 '>
       {
        tweets &&
        tweets.map((tweet) => <TweetCard tweet={tweet} />)
       }
      </div>
      <div className='w-1/4 '>
      {
        user &&
        <TweetForm />
        ||
        <LoginForm next="/tweet" />
      }
      </div>

    </div>
    </>
  )
}

export default Tweet
