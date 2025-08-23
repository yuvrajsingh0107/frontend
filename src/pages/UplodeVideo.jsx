import React, { useState } from 'react'
import { appendErrors } from 'react-hook-form';
import { uploadVideo } from '../utils/api';

function UplodeVideo() {
  const [form, setForm] = useState({
    video: null,
    thumbnail: null,
    title: "",
    description: ""
  })


  const handleChange = (e)=>{
    const {name , value, files} = e.target;
    
    setForm( (prev) => {
     const updatedForm = {
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    };
    return updatedForm
  })


}
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("title", form.title)
    formData.append("description", form.description)
    formData.append("video", form.video)
    formData.append("thumbnail", form.thumbnail)
    const data = localStorage.getItem("user");
    const user = JSON.parse(data);
    if(!user){
       alert("You must be logged in to upload a video");
    }
    console.log(user.accessToken)
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const res = await uploadVideo(formData, user.accessToken)
    console.log(res)
  }
  return (
    <>
      <div className='min-h-screen bg-gray-800'>

        {/* <form 
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className=' flex items-center flex-col gap-5  '> */}

          <label htmlFor="video">Uplode video</label>
          <input 
            name="video"
            className='m-2 w-screen h-40  sm:w-3/5 md:max-w-5xl md:h-50  border-red-200 bg-gray-500' 
            type="file" 
            // accept='video/*' 
            onChange={handleChange}
          id='video' />

          <label htmlFor="thumbnail">Uplode thumbnail</label>
          <input 
            name="thumbnail"
            className='m-2 w-screen h-40  sm:w-3/5 md:max-w-5xl md:h-50  border-red-200 bg-gray-500' 
            type="file" 
            // accept='video/*' 
            onChange={handleChange}
          id='thumbnail' />


          <label htmlFor="title">Title for the video</label>
          <input 
            name="title"
            type="text" 
            value={form.title}
            onChange={handleChange}
            className='m-2 w-screen h-10  sm:w-3/5 md:max-w-5xl   border-red-200 bg-gray-500'
          />


          <label htmlFor="discription">Discription for video</label>
          <textarea 
            name="description"
            value={form.description}
            type="text"
            className='m-2 w-screen h-40  sm:w-3/5 md:max-w-5xl md:h-50  border-red-200 bg-gray-500'
            onChange={handleChange}  
          />
          <button 
          className='m-4 bg-blue-500'
          onClick={handleSubmit}

          // type="submit"
          >
            submit
          </button>

        {/* </form> */}
      </div>
    </>
  )
}

export default UplodeVideo
