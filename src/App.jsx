import React from 'react'
import Home from "./pages/Home"
import Navbar from './components/Navbar';
import { Route, Router, Routes } from 'react-router-dom';
import Watch from './pages/Watch';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoUploadPage from './pages/UplodeVideo';
import Channel from './pages/Channel';
import Tweet from './pages/Tweet';
import Subscription from './pages/Subscription';
import Library from './pages/Library';
import YourChannel from './pages/YourChannel';
function App() {
  Route
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Watch/:id" element={<Watch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/uplode" element={<VideoUploadPage />}/>
        <Route path="/channel/:_id" element={<Channel />}/>
        <Route path="/tweet/" element={<Tweet />}/>
        <Route path="/subscription/" element={<Subscription />}/>
        <Route path="/library/" element={<Library />}/>
        <Route path="/yourchannel/" element={<YourChannel />}/>

        {/* <Route path="/:id" element={<Home />} /> */}
        {/* <Route path="/:id/related" element={<Home />} /> */}
      </Routes>
    </>
  )
}

export default App
