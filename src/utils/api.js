import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true, // for cookies
});

export const login = (data) => API.post("/users/login", data);
export const register = (data) => API.post("/users/register", data);
export const getProfile = () => API.get("/users/getUser").then(res => res.data);
export const logout = () => API.post("/users/logout");
export const refreshToken = () => API.patch("/users/refresh-token");
export const updateAvatar = (data) => API.patch("/users/updateAvatar", data);
export const updateCoverImage = (data) => API.patch("/users/updateCoverImage", data);
export const updateFullName = (data) => API.patch("/users/updateFullName", data);
export const changePassword = (data) => API.patch("/users/changePassword", data);
export const getUserChannel = (data) => API.get(`/users/channel/${data.userName}`);
export const getUserWatchHistory = () => API.get(`/users/history`);


// video requests

export const uploadVideo = (data) => API.post(`/videos/uploadVideo`, data);
export const fetchVideoById = (id) => API.get(`/videos/getVideo/${id}`).then(res => res.data);
export const deleteVideo = (id) => API.delete(`/videos/deleteVideo/${id}`);
export const fetchSearchResults = (params) => API.get(`/videos/getVideos`, { params }).then(res => res.data);
export const fetchVideosFeed = (page) => API.get(`/videos/feed`, { params: { page } }).then(res => res.data);

// subscribe requests

export const toggleSubscribe = (channelId) => API.post(`/subscribe/${channelId}`);
export const getSubscribers = () => API.get(`/subscribe/getSubscribers`);
export const getSubscribedChannels = () => API.get(`/subscribe/getSubscribedChannels`);


// like requests

export const toggelLikeVideo = (videoId) => API.post(`/toggelLike/v/${videoId}`);
export const toggelLikeComment = (commentId) => API.post(`/toggelLike/c/${commentId}`);


// comment requests


export const addComment = (data) => API.post(`/comment/addComment`, data);
export const deleteComment = (commentId) => API.delete(`/comment/deleteComment/${commentId}`);
export const updateComment = (commentId, data) => API.put(`/comment/update/${commentId}`, data);