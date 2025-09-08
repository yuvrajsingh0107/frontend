import { title } from 'framer-motion/client'
import React, { useContext, useState } from 'react'
import {Notification} from '../components/Notification'
import ErrorMessage from '../components/ErrorMessage';
import { postTweet } from '../utils/api';
import {AuthContext} from '../context/AuthContext';

function TweetForm() {
  
  const {user} = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sucess, setSucess] = useState("");
  // Notification()
  const handleChange =  (event) => {
    const { name, value } = event.target;
    // console.log(title)
    console.log(value)
    if (name === "title") {
      setTitle(() =>{
        // console.log(prev)
        return  value
      }); 

      
    } else if (name === "content") {
      setContent(() =>  value);
    }
  }

  const handleSubmit = async (event) => {
    // event.preventDefault();
    console.log("hear")
    try {
      console.log(title, content)
      const res = await postTweet({title:title,content:content}, user.accessToken)
      // console.log(res);
    } catch (error) {
      <ErrorMessage message={error.message}/>
      
    } finally {

      <Notification message={sucess}/>  
    }
  }

  
  return (
    <>
      <div className='sticky top-2 right-2 m-3 mr-4 rounded-lg bg-gray-700 text-gray-100 border-2 border-gray-300 max-w-screen'>
        <div className='flex flex-col gap-10 py-15  items-center' >
          <label
            className='text-4xl font-bold'
          >Add Tweet
          </label>
          <input 
          name = "title"
          className='w-9/10  p-2 border border-gray-600 bg-gray-800 text-gray-100'
          type="text" 
          value={title}
          onChange={(event) => handleChange(event)}
          placeholder='Think a heading'
          />
          <textarea 
          name = "content"
          className='w-9/10 h-50 p-2 border border-gray-600 bg-gray-800 text-gray-100' 
          placeholder='Whats in Your mind?'
          value={content}
          onChange={(event) => handleChange(event)}
          />
          <button onClick={(event) => handleSubmit(event)} type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>Post</button>
        </div>
      </div>
    </>
  )
}

export default TweetForm
