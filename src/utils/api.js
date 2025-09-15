import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL1 || "http://localhost:5000/api/v1",
  withCredentials: true, // for cookies
});

// 🔑 helper function to build headers with token
const authHeaders = (token) => ({
  "Content-Type": "application/json",
  "x-client": "ReactApp",          // your custom header
  "Authorization": `Bearer ${token}`
});

const authHeadersForFormData = (token) => ({
  "Content-Type": "multipart/form-data",
  "x-client": "ReactApp",          // your custom header
  "Authorization": `Bearer ${token}`
});

// ====================== Auth ======================
// export const checkAuth = (token) => API.get("/users/checkAuth", { headers: authHeaders(token) });
export const login = (data) => API.post("/users/login", data, { withCredentials: true });
export const register = (data) => API.post("/users/regiseter", data, { withCredentials: true });
export const logout = (token) => API.post("/users/logout", {}, { headers: authHeaders(token) });

export const addVideoToWatchHistory = (videoId, token) => API.patch(`/users/addTohistory/${videoId}`,{}, {headers: authHeaders(token)});

export const refreshToken = (refreshToken) => API.patch("/users/refresh-token", { refreshToken }, authHeaders(""));

export const getProfile = (token) => API.get("/users/getUser", { headers: authHeaders(token) }).then(res => res.data);
export const updateAvatar = (data, token) => API.patch("/users/updateAvatar", data, { headers: authHeaders(token) });
export const updateCoverImage = (data, token) => API.patch("/users/updateCoverImage", data, { headers: authHeaders(token) });
export const updateFullName = (data, token) => API.patch("/users/updateFullName", data, { headers: authHeaders(token) });
export const changePassword = (data, token) => API.patch("/users/changePassword", data, { headers: authHeaders(token) });
export const getUserChannel = (userName, token) => API.get(`/users/channel/${userName}`, { headers: authHeaders(token) });
export const getUserWatchHistory = (token) => API.get(`/users/history`, { headers: authHeaders(token) });

// ====================== Video ======================
export const fetchVideoById = (id) => API.get(`/videos/getVideo/${id}`).then(res => res.data);
export const fetchVideosFeed = (page) => API.get(`/videos/feed`, { params: { page } }).then(res => res.data);

export const incrimentViews = (videoId,token) => API.patch(`/videos/addView/${videoId}`,{},{headers: authHeaders(token)} )

export const uploadVideo = (data, token) => API.post(`/videos/uplodeVideo`, data, { headers: authHeadersForFormData(token) });
export const deleteVideo = (id, token) => API.delete(`/videos/deleteVideo/${id}`, { headers: authHeaders(token) });
export const fetchSearchResults = (searchQuery) => API.get(`/videos/search`, { params: {search : searchQuery} }).then(res => res.data.data);

// ====================== Subscribe ======================
export const toggleSubscribe = (channelId, token) => API.post(`/subscribe/${channelId}`, {}, { headers: authHeaders(token) });
export const getSubscribers = (token) => API.get(`/subscribe/getSubscribers`, { headers: authHeaders(token) });
export const getSubscribedChannels = (token) => API.get(`/subscribe/getSubscribedChannels`, { headers: authHeaders(token) });
export const isChannelSubscribed = (channelId, token) => API.get(`/subscribe/isSubscribed/${channelId}`, { headers: authHeaders(token) });


// ====================== Like ======================
export const toggleLikeVideo = (videoId, token) =>  API.post(`/toggelLike/v/${videoId}`, {}, { headers: authHeaders(token) });

export const toggleLikeComment = (commentId, token) =>  API.post(`/toggelLike/c/${commentId}`, {}, { headers: authHeaders(token) });

// ====================== Comment ======================
export const getComments = (videoId, page, token) =>   API.get(`/comment/getAllComments/${videoId}/${page}`, { headers: authHeaders(token) });
export const addComment = (data, token) =>   API.post(`/comment/addComment`, data, { headers: authHeaders(token) });
export const updateComment = (commentId, data, token) =>   API.patch(`/comment/update/${commentId}`, data, { headers: authHeaders(token) });


export const deleteComment = (commentId, token) =>   API.delete(`/comment/deleteComment/${commentId}`, { headers: authHeaders(token) });

// ====================== Channel ======================
export const getChannel = (_id,video) => API.get(`/channel/${_id}/1/${video || 1}`).then(res => res.data);
export const getChannelVideos = (_id, page) => API.get(`/videos/getChannelVideos/${_id}/${page}`).then(res => res.data);
export const getChannelTweets = (_id,page) => API.get(`/tweet/getTweetsOfuser/${_id}/${page || 1}`);
  
// ====================== tweet ======================
export const postTweet = (data, token) => API.post("/tweet/create",data, { headers: authHeaders(token) });
export const getTweetFeed = (page,userId) => API.get(`/tweet/feed/${page}/${userId}`);
export const likeTweet = (tweetId, token) => API.post(`/tweet/like/${tweetId}`, {}, { headers: authHeaders(token) });
// export const retweet = (tweetId, token) => API.post(`/tweets/${tweetId}/retweet`, {}, { headers: authHeaders(token) });
// export const replyToTweet = (tweetId, data, token) => API.post(`/tweets/${tweetId}/reply`, data, { headers: authHeaders(token) });
// export const getTweetReplies = (tweetId, token) => API.get(`/tweets/${tweetId}/replies`, { headers: authHeaders(token) }).then(res => res.data);


