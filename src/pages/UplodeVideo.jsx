import { useState } from 'react'
import { uploadVideo } from '../utils/api';
// import ErrorMessage from '../components/ErrorMessage';

function UplodeVideo() {
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
  const handleSubmit = async () => {
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
      <div className='min-h-screen bg-gray-800'>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className='flex items-center flex-col gap-5 '
        >
          <label htmlFor="video" className='text-gray-100 text-4xl'>Uplode video</label>
          <input
            name="video"
            className='m-2 w-screen max-w-screen h-40 sm:p-10 sm:w-3/5 md:max-w-5xl md:h-50 bg-gray-500 border-2 border-dashed border-gray-200 p-8 rounded-lg'
            type="file"
            onChange={handleChange}
            id='video'
          />

          <label htmlFor="thumbnail" className='text-gray-100 text-4xl'>Uplode thumbnail</label>
          <input
            name="thumbnail"
            className='m-2  max-w-screen h-40 sm:p-10 sm:w-3/5 md:max-w-5xl md:h-50 bg-gray-500 border-2 border-dashed border-gray-200 p-8 rounded-lg'
            type="file"
            onChange={handleChange}
            id='thumbnail'
          />

          <label htmlFor="title" className='text-gray-100 text-4xl'>Title for the video</label>
          <input
            name="title"
            placeholder='Enter video title'
            type="text"
            value={form.title}
            onChange={handleChange}
            className='m-2 p-2 rounded w-screen h-10 sm:w-3/5 md:max-w-5xl bg-gray-500 text-gray-100'
          />

          <label htmlFor="discription" className='text-gray-100 text-4xl'>Discription for video</label>
          <textarea
            name="description"
            placeholder='Enter video description'
            value={form.description}
            type="text"
            className='m-2 p-2 rounded w-screen h-40 sm:w-3/5 md:max-w-5xl md:h-50  bg-gray-500 text-gray-100'
            onChange={handleChange}
          />
          <button
            className='m-4 bg-blue-500 hover:bg-blue-600 rounded-2xl px-10 py-3 text-2xl text-gray-100'
            onClick={handleSubmit}
          >
            Uplode
          </button>
        </form>
      </div>
    </>
  )
}

export default UplodeVideo
