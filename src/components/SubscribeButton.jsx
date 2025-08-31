import  { useContext, useEffect, useState } from 'react';
import { isChannelSubscribed, toggleSubscribe  } from '../utils/api';
import {AuthContext} from '../context/AuthContext';
import { Notification } from '../components/Notification';
import ErrorMessage from './ErrorMessage';

const SubscribeButton = ({channelId}) => {
  const {user} = useContext(AuthContext);
  const [message, setMassage] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  


  useEffect(() => {
   try {
     if(user) {
      console.log("user ", user)
       async function fun  () {
         const res = await isChannelSubscribed(channelId, user.accessToken);
         console.log(res)
         setIsSubscribed(res.data)
       }
       fun();
     }
   } catch (error) {
    console.error("error in subscribe button",error)
   }
  },[])
  

  const handelClick = async () => {
    if(!user) {
      setMassage("login to subscribe");
      return;
    }
    console.log(channelId)
    try {
      const res = await toggleSubscribe(channelId,user.accessToken)
      console.log("toggle res : ",res)
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
      {!isSubscribed && 
        <button onClick={handelClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Subscribe
      </button>}
      {isSubscribed &&
       <button onClick={handelClick} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
       Unsubscribe
     </button>}
    </>
  );
}

export default SubscribeButton;
