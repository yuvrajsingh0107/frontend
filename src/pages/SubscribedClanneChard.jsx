import React from 'react'

function SubscribedClanneChard({channel}) {
  // console.log(channel, channel?.avatar)
  if(!channel) return null;
  // const {avatar, coverImage, fullName, userName} = channel
  return (
    <>
    <div className='w-full flex gap-4 items-center p-2  h-20 mb-2 text-gray-100 border-gray-100 border-b-2'>
      <img 
      className='w-16 h-16 border-x-2 bg-amber-200 rounded-full'
      src={channel?.avatar} alt="" />
      <div className=' w-49 h-full'>
        <h2>{channel?.fullName}</h2>
        <h2>{channel?.userName}</h2>
      </div>
    </div>
    </>
  )
}

export default SubscribedClanneChard
