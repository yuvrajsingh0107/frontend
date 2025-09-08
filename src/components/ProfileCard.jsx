import React from 'react'

function ProfileCard() {
  const localUser = JSON.parse(localStorage.getItem("user"));
  console.log(localUser)
  return (
    <>
      <div className='border-2 border-gray-100 flex flex-col rounded-lg w-9/10  m-4'>
        
        <img 
        src={localUser?.avatar} 
        alt={localUser?.fullName} 
        className='w-32 rounded-full my-10 h-32 object-cover m-auto ' />
        <div className='p-4 text-gray-300'>
          <h2 className='text-lg font-bold'>{localUser?.fullName}</h2>
          <p className=''>{localUser?.userName}</p>
          <p className=''>{localUser?.email}</p>
        </div>
      </div>
    </>
    
  )
}

export default ProfileCard
/*

accessToken
: 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODlmMWU3ZjVkNjJkYThiNjYxODc4ZmQiLCJ1c2VyTmFtZSI6Inl1dnJhai5zaW5naC5zaXNvZGl5YSIsImVtYWlsIjoieXV2cmEuc2luZ2guc2lzb2RpeWEyODlAZ21haWwuY29tIiwiaWF0IjoxNzU2Nzk1MjYxLCJleHAiOjE3NTY4ODE2NjF9.Sv28BVnhur4lvA1zrSNtF2dHAZOPb8OwOA31yS3F8B0"
avatar
: 
"http://res.cloudinary.com/dixsg9gz0/image/upload/v1755258492/u6kyzlyslkob6q13mxhk.jpg"
coverImage
: 
"http://res.cloudinary.com/dixsg9gz0/image/upload/v1755258494/bn4cstqvt8larbkhg6gl.webp"
email
: 
"yuvra.singh.sisodiya289@gmail.com"
fullName
: 
"Yuvraj Singh Sisodiya"
refreshToken
: 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODlmMWU3ZjVkNjJkYThiNjYxODc4ZmQiLCJpYXQiOjE3NTY3OTUyNjEsImV4cCI6MTc1NzY1OTI2MX0.e4Ks0pRCv3emruDTn5SFnbyaCBcnfadu1Zs9J9tBLIc"
userName
: 
"yuvraj.singh.sisodiya"
watchHistory
: 
['6896fd95a0d13f9c5326c490']
__v
: 
1
_id
: 
"689f1e7f5d62da8b661878fd"
*/