import { div } from 'framer-motion/client';
import React from 'react';

const SideBarHome = ({setSideBar}) => {
  
  return (
    <div>
    <div  className='absolute w-full h-full backdrop-blur-sm  z-25'>
    </div>


    <div className='fixed  m-2 p-4 w-60 flex flex-col gap-4 rounded h-17/20 bg-gray-700  z-50  shadow-[5px_5px_rgba(100,_98,_100,_0.4),_10px_10px_rgba(100,_98,_100,_0.3),_15px_15px_rgba(100,_98,_100,_0.2),_20px_20px_rgba(100,_98,_100,_0.1),_25px_25px_rgba(100,_98,_100,_0.05)]'>
          <div className='flex gap-2'>
            <button className='text-gray-900 w-1/2 hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'>Video</button>
            <button className='text-gray-900 w-1/2 hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'>Tweet</button>
          </div>
          <button className='w-full text-gray-900  hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'>button</button>
          <button className='w-full text-gray-900  hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'>button</button>
          <button className='w-full text-gray-900  hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'>button</button>
      </div>
    </div>
  );
}

export default SideBarHome;
