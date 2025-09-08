import { useContext, useEffect, useState } from 'react'
import like from '../assets/like.svg';
import { AuthContext } from '../context/AuthContext';
import { likeTweet } from '../utils/api';
import navigator from 'react';


function TweetCard({tweet}) {
  
  const {user} = useContext(AuthContext);
  const [error , setError] = useState("");
  const [likes, setLikes] = useState(tweet.likes);
  useEffect(() => {
    setTimeout(() => {
      if(error) setError("");
    }, 5000)
  }, [error])

  const handelLike = async () => {
    if(!user){
      setError("please login to like the tweet!");
    }else {
      try {
        const res = await likeTweet(tweet._id, user?._id);
        if(res.status == 201){
          setLikes(() => like + 1);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  }
  const navigateToChannel = () => {
    window.location.href = `/channel/${tweet.owner._id}`;
  }
  
  return (
    <div>
      
      <div className=' text-white w-full flex flex-col items-center border-2 border-amber-100 pb-1 ' >
      <div className='px-4 pt-4 w-full'>

      <div className='font-bold text-2xl '>{tweet.title}</div>
      <div>{tweet.content}   </div>
      </div>
      
      <div className='bg-gray-100 w-19/20 h-0.5 mt-3.5 '>
      </div>

      <div className='flex mx-4 my-1 w-19/20 justify-between'>
        <div
        onClick={navigateToChannel}
        
        className='flex gap-4 cursor-pointer items-center '>
          <img className=' rounded-full w-5 h-5 ' src={tweet.owner.avatar} alt="" />
          <p>{tweet.owner.fullName}</p>
        </div>
        <button onClick={() => handelLike()} className=' flex w-20 gap-2 px-3  items-center'>
          <img className='w-5' src={like} alt="like" />
          <h2>{likes}</h2>
        </button>
      </div>
      
      </div>
      <div className='text-gray-400 text-[10px] w-19/20 '>
        Date Posted: 01/01/1000
      </div>
      {error &&
      <div className=' w-full h-10 rounded-2xl bg-red-500 text-center text-white py-2 '>
        {error}
      </div>
      }
    </div>
  )
}

export default TweetCard
