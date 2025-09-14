import { useContext, useEffect, useState } from 'react'
import UplodeVideoForm from '../components/UplodeVideoForm';
import TweetForm from '../components/TweetForm';
import { AuthContext } from '../context/AuthContext';

function YourChannel() {
  const {user} = useContext(AuthContext);
  const [currentContent, setCurrentContent] = useState("video")
  const [UplodeForm, setUplodeForm] = useState(false);
  const [postForm, setPostForm] = useState(false);
  const [videos,setVideos] = useState({});
  const [tweets,setTweets] = useState({});
  const [states,setStates] = useState({});
  useEffect(()=>{
    
  },[currentContent]);
  // console.log(user)
  if(user?.fullName == "null")(
    <>
     
    </>
  )

  return (

    <>

    {
      !user &&
       <div className='w-screen h-screen text-white text-2xl font-bold text-center'>
        login to view your channel
      </div>
    }
     { user &&   
    <div className=' h-screen'>
      {
        UplodeForm && <>
        <div onClick={() => setUplodeForm(false)} className='fixed w-full h-full backdrop-blur-sm  z-25'>
          </div>
          <UplodeVideoForm setUplodeForm={setUplodeForm} />
        </>
      }
      {
        postForm &&
        <>
          <div onClick={() => setPostForm(false)} className='fixed w-full h-full backdrop-blur-sm  z-25'>
          </div>

          <div className='absolute w-100  left-3/8 z-60'>
            <TweetForm />
          </div>
        </>
      }
      <div>
        <img 
        className='w-screen h-30 sm:h-40 bg-red-400'
        src={user?.coverImage} 
        alt="coveimage"  />
        <img 
        className='absolute left-6 top-30 sm:left-10 sm:top-28 w-40 h-40 rounded-full bg-green-400'
        src={user?.avatar} alt="avatar" />
        <div className=' md:flex justify-between m ml-50 sm:ml-60 mb-4  text-gray-100'>
          <div>
            <h3>{user?.fullName}</h3>
            <h3>{user?.userName}</h3>
            <h3>{user?.email}</h3>
          </div>
          <div className='flex mt-5 md:mr-10  gap-1'>
            <button onClick={() => setUplodeForm(true)} className='bg-blue-400 md:px-20 hover:bg-blue-200 px-2 border-1 rounded'>Add Video</button>
            <button onClick={() => setPostForm(true)} className='bg-blue-400 md:px-20 hover:bg-blue-200 px-2 border-1 rounded'>Add Tweet</button>
          </div>
            
        </div>
      </div>
      <div className='sticky top-0 flex justify-evenly border-t-2 border-b-2 text-gray-100'>
        <button 
        onClick={() => setCurrentContent("video")}
        className='py-3 '>video
          {
          currentContent === "video" && (
            <div className='bg-gray-100 h-0.5 w-full'></div>
          )
          }
          {/* <div className='bg-gray-100 h-0.5 w-full'></div> */}
        </button>

        <button 
        onClick={() => setCurrentContent("tweets")}
        className='py-3 '>Tweets
          {
          currentContent === "tweets" && (
            <div className='bg-gray-100 h-0.5 w-full'></div>
          )
          }

        </button>
        <button 
        onClick={() => setCurrentContent("about")}
        className='py-3'>About
          {
          currentContent === "about" && (
            <div className='bg-gray-100 h-0.5 w-full'></div>
          )
          }
        </button>
      </div>
    </div>}
  </>

  )
}

export default YourChannel

