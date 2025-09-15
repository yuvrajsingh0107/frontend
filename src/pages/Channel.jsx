import { useEffect, useMemo, useState } from "react";
import { getChannel, getChannelTweets, getChannelVideos } from "../utils/api";
import ChannelVideoCard from "../components/ChannelVideoCard";
import ErrorMessage from "../components/ErrorMessage";
import { Notification } from "../components/Notification";
import  TweetCard  from '../components/TweetCard';

export default function Channel() {
  
  const url = window.location.href.split("/")
  const _id = url[url.length - 1];
  const [page, setPage] = useState(1);
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [content, setContent] = useState("video");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [massage, setMassage] = useState("");

  useEffect(()=> {
    const getTweets =  async() => {
    // this function fetch tweets of the channnel 
    if(content == "tweet" && tweets.length === 0){

      const res = await getChannelTweets(_id,1);
      setTweets(res.data.data);
      console.log(tweets)
    } 
  }

  getTweets()


  },[content])
  
  

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        if (_id) {
          const channelRes = await getChannel(_id,1);
          setChannel(channelRes?.data?.channelInfo);
          setVideos(channelRes?.data?.videos);
        }

      } catch (e) {
        setError(e?.response?.data?.message || e?.message || "Failed to load dashboard");
      } finally {
        setPage(prev => prev + 1)
        setLoading(false);
      }
    }
    load();
  }, [_id]);



  const loadMoreVideos = async () => {
    const channelVideos = await getChannelVideos(_id, page);
    if (channelVideos.data.length == 0) {
      // notfi no more videos 
      setMassage("No more videos uploded");
      setTimeout(() => {
        setMassage("");
      }, 5000);
      return;
    }
    setVideos(prevVideos => [...prevVideos, ...channelVideos.data]);
    setPage(prevPage => prevPage + 1);
  }

  const stats = useMemo(() => {
    return {
      subscribers: channel?.subscribers || 0,
      totalTweets: channel?.totalTweets ||0,
      totalLikes: channel?.likes || 0,
      totalVideos: channel?.totalVideos || 0,
    };
  }, [channel, videos]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {massage &&
        <Notification message={massage} />
      }
      <ErrorMessage message={error} onClose={() => setError("")} />
      <div className="relative">
        <div className="h-38 w-full bg-gradient-to-r from-gray-800 to-gray-700">
          <img src={channel?.coverImage} alt="banner" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="-mt-2 flex flex-col sm:flex-row itemsend gap-4">
            <img
              src={channel?.avatar || "https://via.placeholder.com/96"}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-gray-900 object-cover"
            />
            <div className="pt-2 ">
              <h1 className="text-2xl font-semibold">{channel?.userName}</h1>
              <p className="text-gray-300 text-sm">{channel?.fullName}</p>
              <p className="text-gray-400 text-xs">{channel?.email}</p>
            </div>
            <div className="flex-grow pt-3">
              <p>Subscribers: {stats.subscribers} • video: {stats.totalVideos} • tweets : {stats.totalTweets}</p>
            </div>
            <div className="pt-2 px-10 flex items-center">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="relative rounded-2xl border border-gray-700 bg-gray-800/60 backdrop-blur-md p-4 overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />
          <button onClick={() => setContent("video")} className="bg-gray-600 hover:bg-gray-500 text-white px-8  py-1 my-2 mx-2  rounded">Video</button>
          <button onClick={() => setContent("tweet")} className="bg-gray-600 hover:bg-gray-500 text-white px-8  py-1 my-2 mx-2 rounded">Tweet</button>
          {loading && <div className="text-gray-400">Loading...</div>}
          {error && <div className="text-red-400">{error}</div>}
          {!loading && !videos.length && (
            <div className="text-gray-400">No videos yet. Upload your first one!</div>
          )}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {
              content === "video" &&
              videos.map((v) => (
                <ChannelVideoCard key={v._id} video={v} />
              )) ||
              tweets.map((t) => (
                <TweetCard key={t._id} tweet={t} />
              ))
            }
          </div>
          <button onClick={() => loadMoreVideos()}>Load More.....</button>
        </div>
      </div>
    </div>
  );
}


