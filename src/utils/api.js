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

// ====================== Auth ======================
export const login = (data) => API.post("/users/login", data, { withCredentials: true });
export const register = (data) => API.post("/users/regiseter", data, { withCredentials: true });
export const logout = (token) => API.post("/users/logout", {}, { headers: authHeaders(token) });


export const getProfile = (token) => API.get("/users/getUser", { headers: authHeaders(token) }).then(res => res.data);
export const refreshToken = (token) => API.patch("/users/refresh-token", {}, { headers: authHeaders(token) });
export const updateAvatar = (data, token) => API.patch("/users/updateAvatar", data, { headers: authHeaders(token) });
export const updateCoverImage = (data, token) => API.patch("/users/updateCoverImage", data, { headers: authHeaders(token) });
export const updateFullName = (data, token) => API.patch("/users/updateFullName", data, { headers: authHeaders(token) });
export const changePassword = (data, token) => API.patch("/users/changePassword", data, { headers: authHeaders(token) });
export const getUserChannel = (userName, token) => API.get(`/users/channel/${userName}`, { headers: authHeaders(token) });
export const getUserWatchHistory = (token) => API.get(`/users/history`, { headers: authHeaders(token) });

// ====================== Video ======================
export const fetchVideoById = (id) => API.get(`/videos/getVideo/${id}`).then(res => res.data);
export const fetchVideosFeed = (page) => API.get(`/videos/feed`, { params: { page } }).then(res => res.data);

export const uploadVideo = (data, token) => API.post(`/videos/uplodeVideo`, data, { headers: authHeaders(token) });
export const deleteVideo = (id, token) => API.delete(`/videos/deleteVideo/${id}`, { headers: authHeaders(token) });
export const fetchSearchResults = (searchQuery) => API.get(`/videos/search`, { params: {search : searchQuery} }).then(res => res.data.data);

// ====================== Subscribe ======================
export const toggleSubscribe = (channelId, token) => API.post(`/subscribe/${channelId}`, {}, { headers: authHeaders(token) });
export const getSubscribers = (token) => API.get(`/subscribe/getSubscribers`, { headers: authHeaders(token) });
export const getSubscribedChannels = (token) => API.get(`/subscribe/getSubscribedChannels`, { headers: authHeaders(token) });

// ====================== Like ======================
export const toggleLikeVideo = (videoId, token) =>  API.post(`/toggelLike/v/${videoId}`, {}, { headers: authHeaders(token) });

export const toggleLikeComment = (commentId, token) =>  API.post(`/toggelLike/c/${commentId}`, {}, { headers: authHeaders(token) });

// ====================== Comment ======================
export const getComments = (videoId, page, token) =>   API.get(`/comment/getAllComments/${videoId}/${page}`, { headers: authHeaders(token) });
export const addComment = (data, token) =>   API.post(`/comment/addComment`, data, { headers: authHeaders(token) });


export const deleteComment = (commentId, token) =>   API.delete(`/comment/deleteComment/${commentId}`, { headers: authHeaders(token) });
export const updateComment = (commentId, data, token) =>   API.put(`/comment/update/${commentId}`, data, { headers: authHeaders(token) });






// import axios from "axios";


// //9754101680
// // const API = axios.create({
// //   baseURL: "http://localhost:5000/api/v1",
// //   withCredentials: true, // for cookies
// // });
// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL2 || "http://localhost:5000/api/v1",
//   withCredentials: true, // for cookies
// });



//  export const login = (data) => API.post("/users/login", data , {withCredentials : true});
//  export const register = (data) => API.post("/users/regiseter", data, {withCredentials: true});
// export const getProfile = (header) => API.get("/users/getUser", { headers: header }).then(res => res.data);
// export const logout = (header) => API.post("/users/logout", {withCredentials: true, headers: header});
// export const refreshToken = (header) => API.patch("/users/refresh-token", {withCredentials: true, headers: header});
// export const updateAvatar = (data, header) => API.patch("/users/updateAvatar", data,{ withCredentials: true, headers: header });
// export const updateCoverImage = (data, header) => API.patch("/users/updateCoverImage", data,{ withCredentials: true, headers: header });
// export const updateFullName = (data, header) => API.patch("/users/updateFullName", data,{ withCredentials: true, headers: header });
// export const changePassword = (data, header) => API.patch("/users/changePassword", data,{ withCredentials: true, headers: header });
// export const getUserChannel = (data, header) => API.get(`/users/channel/${data.userName}`,{ withCredentials: true, headers: header });
// export const getUserWatchHistory = (header) => API.get(`/users/history`,{ withCredentials: true, headers: header });


// // video requests

// export const uploadVideo = (data, header) => API.post(`/videos/uploadVideo`, data,{ withCredentials: true, headers: header });
//  export const fetchVideoById = (id) => API.get(`/videos/getVideo/${id}`).then(res => res.data);
// export const deleteVideo = (id, header) => API.delete(`/videos/deleteVideo/${id}`,{ withCredentials: true,headers: header });
// export const fetchSearchResults = (params) => API.get(`/videos/getVideos`, { params }).then(res => res.data);
//  export const fetchVideosFeed = (page) => API.get(`/videos/feed`, { params: { page } }).then(res => res.data); 

// // subscribe requests

// export const toggleSubscribe = (channelId, header) => API.post(`/subscribe/${channelId}`,{ withCredentials: true, headers: header });
// export const getSubscribers = (header) => API.get(`/subscribe/getSubscribers`,{ withCredentials: true, headers: header });
// export const getSubscribedChannels = (header) => API.get(`/subscribe/getSubscribedChannels`,{ withCredentials: true, headers: header });


// // like requests

//  export const toggleLikeVideo = (videoId, token) => API.post(`/toggelLike/v/${videoId}`,{},
//   { 
//     withCredentials: true, 
//     headers: {
//       "Content-Type": "application/json", // typical header
//       "x-client": "ReactApp",             // custom header
//       "Authorization": `Bearer ${token}` // auth header if needed
//     }  });
//  export const toggleLikeComment = (commentId, header) => API.post(`/toggelLike/c/${commentId}`,{ withCredentials: true, headers: header });


// // comment requests

//  export const getComments = (videoId,page, header) => API.get(`/comment/getAllComments/${videoId}/${page}`,{ withCredentials: true, headers: header });
//  export const addComment = (data, header) => API.post(`/comment/addComment`, data,{ withCredentials: true, headers: header });
// export const deleteComment = (commentId, header) => API.delete(`/comment/deleteComment/${commentId}`,{ withCredentials: true, headers: header });
// export const updateComment = (commentId, data, header) => API.put(`/comment/update/${commentId}`, data,{ withCredentials: true, headers: header });