import React from 'react';


const Warning = ({message, deleteComment, cancel}) => {
  return (

    <div id="alert-additional-content-4" className="p-1 mb-4 mt-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{message}</h3>
        <div className='flex gap-2'>

        <button onClick={deleteComment} type="button" className="text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800">
          Delete
        </button>
        <button onClick={cancel} type="button" className="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800" data-dismiss-target="#alert-additional-content-4" aria-label="Close">
          Dismiss
        </button>
        </div>
      </div>
    </div>


  );
}

export default Warning;
