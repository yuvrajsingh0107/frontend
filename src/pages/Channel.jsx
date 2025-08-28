import { useEffect, useMemo, useState } from "react";
import { getChannel, getChannelVideos } from "../utils/api";
import ChannelVideoCard from "../components/ChannelVideoCard";
import ErrorMessage from "../components/ErrorMessage";


export default function Channel() {
  const url = window.location.href.split("/")
  const _id = url[url.length - 1];
  const [page, setPage] = useState(1);
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("default error");


  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");

        if (_id) {
          const channelRes = await getChannel(_id);
          if (isMounted) setChannel(channelRes?.data?.channelInfo);
          if (isMounted) setVideos(channelRes?.data?.videos);
        }


      } catch (e) {
        if (isMounted) setError(e?.response?.data?.message || e?.message || "Failed to load dashboard");
      } finally {
        setPage(prev => prev + 1)
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [_id]);



  const loadMoreVideos = async () => {
    const channelVideos = await getChannelVideos(_id, page);
    if (channelVideos.data.length == 0) {
      // notfi no more videos 
    }
    setVideos(prevVideos => [...prevVideos, ...channelVideos.data]);
    setPage(prevPage => prevPage + 1);
  }

  const stats = useMemo(() => {
    return {
      subscribers: channel?.subscriberCount ?? 0,
      subscribed: channel?.subscribedChannelCount ?? 0,
      totalViews: channel?.totalViews,
      totalLikes: channel?.likes,
      totalVideos: channel?.totalVideos,
    };
  }, [channel, videos]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <ErrorMessage message={error} onClose={() => setError("")} />
      <div className="relative">
        <div className="h-48 w-full bg-gradient-to-r from-gray-800 to-gray-700">
          <img src={channel?.coverImage} alt="banner" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="-mt-12 flex itemsend gap-4">
            <img
              src={channel?.avatar || "https://via.placeholder.com/96"}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-gray-900 object-cover"
            />
            <div className="pb-2">
              <h1 className="text-2xl font-semibold">{channel?.userName}</h1>
              <p className="text-gray-300 text-sm">{channel?.fullName}</p>
              <p className="text-gray-400 text-xs">{channel?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: "Subscribers", value: stats.subscribers },
          { label: "Subscribed", value: stats.subscribed },
          { label: "Views", value: stats.totalViews },
          { label: "Likes", value: stats.totalLikes },
          { label: "Videos", value: stats.totalVideos },
        ].map((s) => (
          <div key={s.label} className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex flex-col items-center">
            <span className="text-sm text-gray-400">{s.label}</span>
            <span className="text-xl font-semibold mt-1">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="relative rounded-2xl border border-gray-700 bg-gray-800/60 backdrop-blur-md p-4 overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />
          <h2 className="text-lg font-semibold mb-3">Your Videos</h2>
          {loading && <div className="text-gray-400">Loading...</div>}
          {error && <div className="text-red-400">{error}</div>}
          {!loading && !videos.length && (
            <div className="text-gray-400">No videos yet. Upload your first one!</div>
          )}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {videos.map((v) => (
              <ChannelVideoCard key={v._id} video={v} />
            ))}
          </div>
          <button onClick={() => loadMoreVideos()}>Load More.....</button>
        </div>
      </div>
    </div>
  );
}


