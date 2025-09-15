import { useNavigate } from "react-router-dom";
function VideoCard({video}) {
  const navigate = useNavigate()
  // console.log(video)
  const onClick = (e) => {
    
    if(e.target.id == "avatar" || e.target.id == "avatarDiv" || e.target.id == "avatarDivParent"){
      navigate(`/channel/${video.ownerInfo[0]._id}`)
      // window.location.href = `/channel/${video.ownerInfo[0]._id}`;
    }else{
      navigate(`/watch/${video._id}`)
      // window.location.href = `/watch/${video._id}`;
    }
  }
  return (
    <div className='cursor-pointer'>
            
              <motion.article
                onClick={(event) => onClick(event)}
                key={video._id}
                whileHover={{ scale: 1.01 }}
                className="group cursor-pointer max-w-sm rounded-2 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 bg-white"
              >
                {/* Thumbnail */}
                <div className="relative w-full">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-44 object-cover  block"
                    loading="lazy"
                  />

                  {/* Duration badge */}
                  {video.duration && (
                    <span className="absolute right-2 bottom-2 bg-black bg-opacity-80 text-xs text-white px-2 py-0.5 rounded-md">
                      {Math.floor(video.duration / 60) < 10 ? `0${Math.floor(video.duration / 60)}` : Math.floor(video.duration / 60)} : {Math.floor(video.duration % 60) < 10 ? `0${Math.floor(video.duration % 60)}` : Math.floor(video.duration % 60)}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div id="avatarDivParent" className="p-3 flex gap-3 items-start bg-gray-900 text-white">
                  {/* Avatar */}
                  <div id='avatarDiv' className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      // onClick={ navigateToChannel}
                      id='avatar'
                      src={video.ownerInfo[0]?.avatar}
                      alt={`${video.ownerInfo[0]?.userName} avatar`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Text block */}
                  <div className="min-w-0 ">
                    <h3 className="text-sm font-semibold leading-tight text-white truncate">
                      {video.title}
                    </h3>

                    <div className="flex items-center text-xs text-gray-500 mt-1 gap-2 truncate">
                      <span className="truncate">{video.ownerInfo[0]?.userName}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">{video.views ?? "0"} views</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">{video.createdAt}</span>
                    </div>

                    <p className="mt-2 text-xs text-gray-600 line-clamp-2">{video.description}</p>
                  </div>
                </div>
              </motion.article>
             </div>
  )
}

export default VideoCard
