import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api/v1",
//   withCredentials: true, // for cookies
// });
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL1 || "http://localhost:5000/api/v1",
  withCredentials: true, // for cookies
});

 export const login = (data) => API.post("/users/login", data , {withCredentials : true, credentials: 'include'});
 export const register = (data) => API.post("/users/regiseter", data, {withCredentials: true});
export const getProfile = () => API.get("/users/getUser").then(res => res.data);
export const logout = () => API.post("/users/logout", {withCredentials: true});
export const refreshToken = () => API.patch("/users/refresh-token", {withCredentials: true});
export const updateAvatar = (data) => API.patch("/users/updateAvatar", data,{ withCredentials: true });
export const updateCoverImage = (data) => API.patch("/users/updateCoverImage", data,{ withCredentials: true });
export const updateFullName = (data) => API.patch("/users/updateFullName", data,{ withCredentials: true });
export const changePassword = (data) => API.patch("/users/changePassword", data,{ withCredentials: true });
export const getUserChannel = (data) => API.get(`/users/channel/${data.userName}`,{ withCredentials: true });
export const getUserWatchHistory = () => API.get(`/users/history`,{ withCredentials: true });


// video requests

export const uploadVideo = (data) => API.post(`/videos/uploadVideo`, data,{ withCredentials: true });
 export const fetchVideoById = (id) => API.get(`/videos/getVideo/${id}`).then(res => res.data);
export const deleteVideo = (id) => API.delete(`/videos/deleteVideo/${id}`,{ withCredentials: true });
export const fetchSearchResults = (params) => API.get(`/videos/getVideos`, { params }).then(res => res.data);
 export const fetchVideosFeed = (page) => API.get(`/videos/feed`, { params: { page } }).then(res => res.data); 

// subscribe requests

export const toggleSubscribe = (channelId) => API.post(`/subscribe/${channelId}`,{ withCredentials: true });
export const getSubscribers = () => API.get(`/subscribe/getSubscribers`,{ withCredentials: true });
export const getSubscribedChannels = () => API.get(`/subscribe/getSubscribedChannels`,{ withCredentials: true });


// like requests

 export const toggelLikeVideo = (videoId) => API.post(`/toggelLike/v/${videoId}`,{},{ withCredentials: true });
export const toggelLikeComment = (commentId) => API.post(`/toggelLike/c/${commentId}`,{ withCredentials: true });


// comment requests

 export const getComments = (videoId,page) => API.get(`/comment/getAllComments/${videoId}/${page}`,{ withCredentials: true });
 export const addComment = (data) => API.post(`/comment/addComment`, data,{ withCredentials: true });
export const deleteComment = (commentId) => API.delete(`/comment/deleteComment/${commentId}`,{ withCredentials: true });
export const updateComment = (commentId, data) => API.put(`/comment/update/${commentId}`, data,{ withCredentials: true });