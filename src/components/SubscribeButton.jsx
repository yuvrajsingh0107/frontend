import { button } from 'framer-motion/client';
import React, { useContext, useState } from 'react';
import { toggleSubscribe } from '../utils/api';
import {AuthContext} from '../context/AuthContext';
import { Notification } from '../components/Notification';
import { useScroll } from 'framer-motion';
import ErrorMessage from './ErrorMessage';

const SubscribeButton = ({isSunscribed, setIsSubscribed, channelId}) => {
  const {user} = useContext(AuthContext);
  const [message, setMassage] = useState("")
  if(!user) {
    setMassage("login to subscribe");
    // setTimeout(() => setMassage(""),5000)

  }
  const handelClick = async () => {
    console.log(channelId)
    try {
      const res = await toggleSubscribe(channelId,user.accessToken)
      setIsSubscribed(prev => !prev);      
    } catch (error) {
      <ErrorMessage  message={message} setError={setMassage}  />
      
    }

  }
  return (
    <>
      {
        message && 
        <Notification message={message}/>
      }
      {isSunscribed && 
        <button onClick={handelClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Subscribe
      </button>}
      {!isSunscribed &&
       <button onClick={handelClick} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
       Unsubscribe
     </button>}
    </>
  );
}

export default SubscribeButton;
