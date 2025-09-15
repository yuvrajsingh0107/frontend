import  { useContext, useEffect, useState } from 'react'
import { getChannel } from '../utils/api';
import { AuthContext } from '../context/AuthContext';

function AboutSecation() {
  const {user} = useContext(AuthContext);
  
  const [channel, setChannel] = useState({});

  useEffect(() => {
    
    try {
        async function load() {
          try {
            if (user._id) {
              const channelRes = await getChannel(user._id,0);
              setChannel(channelRes.data.channelInfo);
            }
          } catch (e) {
            console.log(e?.response?.data?.message || e?.message || "Failed to load dashboard");
          } 
        }
        load();
    } catch (error) {
      console.log(error)
    }
  }, [])



  const data = {
    totalVideos: channel.totalVideos,
    totalComment: channel.totalcomments ,
    totalTweet: channel.totalTweets,
    subscriber: channel.subscribers,
    likes: channel.likes,
    views: channel.totalViews
  }
  return (
    <>
      <div className='w-full py-10 bg-gray-800 px-5 rounded-md shadow-md flex flex-col gap-3'>
        {
          Object.entries(data).map(([key, value]) => (
            <div className='flex justify-between border-gray-100 border-b-2 py-2'>
              <h3 className='font-bold text-gray-100 capitalize'>{key.replace(/([A-Z])/g, ' $1')}</h3>
              <h3 className='font-bold text-gray-100'>{data[key]}</h3>
            </div>
        ))
        }
      </div>
    </>
  )
}

export default AboutSecation
