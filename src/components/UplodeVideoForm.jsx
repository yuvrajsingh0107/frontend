import { useState } from 'react'
import { uploadVideo } from '../utils/api';

function UplodeVideoForm({setUplodeForm}) {
  const [form, setForm] = useState({
      video: null,
      thumbnail: null,
      title: "",
      description: ""
    })
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
  
      setForm((prev) => {
        const updatedForm = {
          ...prev,
          [name]: files && files.length > 0 ? files[0] : value,
        };
        return updatedForm
      })
  
    }
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("title", form.title)
      formData.append("description", form.description)
      formData.append("video", form.video)
      formData.append("thumbnail", form.thumbnail)
      const data = localStorage.getItem("user");
      const user = JSON.parse(data);
      if (!user) {
        alert("You must be logged in to upload a video");
      }
      const res = await uploadVideo(formData, user.accessToken);
      if(!res.ok){
        // <ErrorMessage message={res.status} setError={() => setError(res.status)} />
      }
    }
  return (
     <>
      <div className=' absolute sm:absolute  sm:left-1/2 sm:-translate-x-1/2 sm:top-22 sm:pt-10 rounded z-50  bg-gray-800'>
        <form
          onSubmit={(event) => handleSubmit(event)}
          encType="multipart/form-data"
          className='flex items-center flex-col '
        >
          <label htmlFor="video"
           className='text-gray-100 text-2xl'>Uplode video</label>
          <input
            name="video"
            className='m-4 bg-gray-500 border-2 border-dashed border-gray-200 p-8 rounded-lg'
            type="file"
            
            onChange={handleChange}
            id='video'
          />

          <label htmlFor="thumbnail" className='text-gray-100 text-2xl'>Uplode thumbnail</label>
          <input
            name="thumbnail"
            className='m-4 bg-gray-500 border-2 border-dashed border-gray-200 p-8 rounded-lg'
            type="file"
            onChange={handleChange}
            id='thumbnail'
          />

          <label htmlFor="title" className='text-gray-100 text-2xl'>Title for the video</label>
          <input
            name="title"
            placeholder='Enter video title'
            type="text"
            value={form.title}
            onChange={handleChange}
            className='m-2 p-2 rounded w-9/10 h-10  bg-gray-500 text-gray-100'
          />

          <label htmlFor="discription" className='text-gray-100 text-2xl'>Discription for video</label>
          <textarea
            name="description"
            placeholder='Enter video description'
            value={form.description}
            type="text"
            className='m-3 p-2 rounded w-9/10 h-40  md:max-w-5xl md:h-50  bg-gray-500 text-gray-100'
            onChange={handleChange}
          />
          <div className='flex '>

          <button
            className='m-4 bg-blue-500 hover:bg-blue-600 rounded-2xl px-10 py-3 text-2xl text-gray-100'
            onClick={handleSubmit}
            >
            Uplode
          </button>
          <button
            className='m-4 bg-blue-500 hover:bg-blue-600 rounded-2xl px-10 py-3 text-2xl text-gray-100'
            onClick={() => setUplodeForm(false)}
            >
            cancel
          </button>
            </div>
        </form>
      </div>
    </>
  )
}

export default UplodeVideoForm
