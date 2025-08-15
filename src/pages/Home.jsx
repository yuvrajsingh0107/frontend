import { useContext, useRef } from 'react'
import { fetchVideosFeed } from '../utils/api.js';
import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard.jsx';
import { AuthContext } from '../context/AuthContext.jsx';


function Home() {
  
  const {user, setUser} = useContext(AuthContext)

  
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHaseMoer] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const loaderRef = useRef()

  useEffect(() => {
    console.log("featching data for page: ", page)
    const fetchData = async () => {
      const result = await fetchVideosFeed(page);
      setVideos(result.data);
      setPage((prev) => prev + 1)
      setLoading(false);
    };
    fetchData();
  }, []);


async function fetchData(){
  if(!hasMore) return ;
  if(loading) return;

  setLoading(true);
  try {
    
    const res = await fetchVideosFeed(page);
    if(res.data.length == 0){
      setHaseMoer(false);
    }
    console.log(res)
  
    setVideos((prev) => [...prev , ...res.data])
    setPage(prev => prev + 1);
  
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false);
  }

}

 useEffect(() => {
  console.log("useEffect triggered")
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          console.log("calling for page : ",page)
          fetchData();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef, loading]);

  if (loading) return <div>Loading...</div>;
  if (!videos.length) return <div>No videos found</div>;
  return (
    
    
    <div className="bg-gray-800 min-h-screen text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
                  {
          videos.map((video) => (
            <VideoCard _id={video._id} video={video} key={video._id} />
          ))
        }

      </div>
      {/* Skeleton loader when loading */}
      {loading &&
        Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse bg-neutral-800 rounded-xl overflow-hidden"
          >
            <div className="bg-neutral-700 h-48 w-full"></div>
            <div className="p-3 space-y-2">
              <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
              <div className="h-3 bg-neutral-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}

      {/* Loader Ref for infinite scroll trigger */}
      <div ref={loaderRef} className="h-10 col-span-full"></div>

    </div>
  )
}

export default Home
