import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SideBarHome = () => {
  const [mode, setMode] = useState('video');
  const [page , setPage] = useState("");
  const [click, setClick] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    const url = window.location.pathname.split('/',);
    if(!url[2]){setMode('video')}
    if(url.includes('tweet')){setMode('tweet')}
    if(url.includes("subscription")){setPage("subscription")}
    if(url.includes("yourchannel")){setPage("yourchannel")}
    if(url.includes("library")){setPage("library")}
  }, [click])


  return (



    <div className='fixed  m-2 p-4 w-60 flex flex-col gap-4 rounded h-17/20 bg-gray-700  z-50  shadow-[5px_5px_rgba(100,_98,_100,_0.4),_10px_10px_rgba(100,_98,_100,_0.3),_15px_15px_rgba(100,_98,_100,_0.2),_20px_20px_rgba(100,_98,_100,_0.1),_25px_25px_rgba(100,_98,_100,_0.05)]'>
      <div className='flex gap-2'>
       
        {
          mode == 'video' && 
          <>
          <button className='text-gray-900 w-1/2 hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-white dark:bg-gray-600 dark:focus:ring-gray-800'>
          Video
          </button>
          <button onClick={() =>{ navigate("/tweet"); setClick(!click)}}
           className='text-gray-900 w-1/2 hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'>
          Tweet
          </button>
          </>
        }
        {
          mode == 'tweet' &&
          <>
          <button
          onClick={()=> { navigate('/'); setClick(!click)}}
          className='text-gray-900 w-1/2 hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'>
          Video
          </button>
          <button className='text-gray-900 w-1/2 hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600  dark:text-white dark:bg-gray-600 dark:focus:ring-gray-800'>
          Tweet
          </button>
          </>
        }
      </div>
      {
        page == 'home' && 
      <button className='w-full text-gray-900  hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600  dark:text-white dark:bg-gray-600 dark:focus:ring-gray-800'>
        Home
        </button>
        ||
        <button
        onClick={() => {navigate('/'); setClick(!click)}}
         className='w-full text-gray-900  hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'>
        Home
        </button>

      }
      {
        page == 'yourchannel' && 
      <button className='w-full text-gray-900  hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600  dark:text-white dark:bg-gray-600 dark:focus:ring-gray-800'>
        Your Channel
        </button>
        ||
        <button 
        onClick={() => {navigate('/yourchannel'); setClick(!click)}}
        className='w-full text-gray-900  hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'>
        Your Channel
        </button>

      }
      {
        page == 'subscription' && 
      <button className='text-gray-900 w-full hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600  dark:text-white dark:bg-gray-600 dark:focus:ring-gray-800'>
        Subscription
        </button>
        ||
        <button
        onClick={() => {navigate('/subscription'); setClick(!click)}}
        className='w-full text-gray-900  hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'>
          Subscription
        </button>

      }
      
      {
        page == 'library' && 
      <button className='text-gray-900 w-full hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600  dark:text-white dark:bg-gray-600 dark:focus:ring-gray-800'>
        Library
        </button>
        ||
        <button
        onClick={() => {navigate('/library'); setClick(!click)}}
        className='w-full text-gray-900  hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'>
        Library
        </button>

      }
    </div>
  );
}

export default SideBarHome;
