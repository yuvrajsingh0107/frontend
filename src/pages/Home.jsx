import React from 'react'
import {motion} from 'framer-motion';
import { fetchVideosFeed } from '../utils/api.js';
import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard.jsx';

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchVideosFeed();
      setVideos(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const onClick = (e) => {
    console.log(e.target)
  }

  console.log(videos);

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

    </div>
  )
}

export default Home
