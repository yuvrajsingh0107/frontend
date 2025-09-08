import React, { use, useContext, useEffect, useState } from 'react'
import SubscribedClanneChard from './SubscribedClanneChard'
import SubscribeVideoCard from '../components/SubscribeVideoCard'
import TweetCard from '../components/TweetCard';
import { AuthContext } from '../context/AuthContext';
import { getSubscribedChannels } from '../utils/api';

function Subscription() {
  const [content, setContent] = useState("video");
  const { user } = useContext(AuthContext);
  const [videoPage, setVideoPage] = useState(1);
  const [tweetPage, setTweetPage] = useState(1);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const getChannel = async () => {
      // channel sare ak hi bar me ate he
      const res = await getSubscribedChannels(user.accessToken)
      console.log(res.data.data)
      setChannels(res.data.data);
    };
    const getSubscribedVideo = async (page) => {
      // pagienate for video 

    }
    console.log(user)
    if (user) {
      console.log("message")
      getChannel();
      getSubscribedVideo(videoPage);
    }
  }, [user]);

  return (
    <>
      {
        !user &&
        <div className='w-screen h-screeen text-2xl font-bold text-white text-center'>
          Login to view your channel
        </div>
      }

      {
        user &&
        <div className='flex'>
        {/* side bar for channel list */}
        <div className='p-3 w-1/4 '>
          {
            channels.map((channel) => {
              console.log(channel)

              return <SubscribedClanneChard channel={channel.channelInfo[0]}/>
            }
            )
          }
          <SubscribedClanneChard />
          <SubscribedClanneChard />
          <SubscribedClanneChard />
        </div>

        {/* main box for content */}
        <div className=' border-l-2 p-3 flex flex-col gap-4 border-amber-50 w-3/4 '>
          {/* buttons to toggle b/w tweet and video*/}
          <div className='w-full font-extrabold text-white  flex justify-around h-13 border-y-2 border-gray-100'>
            <button
              onClick={() => setContent("video")}
              className='w-1/3 h-full flex flex-col items-center py-2'>
              VIDEO
              {
                content === "video" ? <div className='w-20 h-1 bg-white'></div> : null
              }
            </button>
            <div className='w-1 h-full bg-white'></div>
            <button
              onClick={() => setContent("tweet")}
              className='w-1/3 h-full flex flex-col items-center py-2'>
              TWEET
              {
                content === "tweet" ? <div className='w-20 h-1 bg-white'></div> : null
              }
            </button>


          </div>
          {/* content */}
          {
            content === "video" &&
            <div>
              <SubscribeVideoCard />
              <SubscribeVideoCard />
              <SubscribeVideoCard />
            </div>

          }
          {
            content === "tweet" &&
            <div>
              {/* <TweetCard tweet={{}} /> */}

            </div>

          }
        </div>
      </div>}
    </>
  )
}

export default Subscription
