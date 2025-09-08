import React from 'react'

function SubscribeVideoCard() {
  return (
    <div className='bg-gray-800 flex gap-10 p-4 rounded-lg'>
      <img className='bg-red-400 w-2/5 h-50' src={null} alt="" />
      <div className='w-3/5 h-full flex flex-col justify-between'>
      <div>

        <h3 className='text-white text-xl font-semibold'>Video Title</h3>
        <p className='text-white'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio beatae sequi quaerat dolor. vero aspernatur iste reiciendis nisi ullam repellat eum debitis, alias quis obcaecati iusto.</p>
      </div>

        <div className="flex align-baseline items-center text-xs text-gray-500 mt-1 gap-2 truncate">
          <span className="truncate">userName</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">0 views</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">createdAt</span>
        </div>

      </div>

    </div>
  )
}

export default SubscribeVideoCard
