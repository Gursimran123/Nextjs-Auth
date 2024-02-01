import React from 'react'

const UserProfile = ({params}:any) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>User Profile</h1>
        <p className='text-4xl'>Profile Page 
        <span className='rounded ml-2 bg-orange-500 text-white p-2'>{params.id}</span>
        </p>
    </div>
  )
}

export default UserProfile