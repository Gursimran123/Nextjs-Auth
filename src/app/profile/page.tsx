"use client";
import axios from 'axios';
import Link from 'next/link'
import React,{useState} from 'react';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation'

const Profile = () => {
  const router=useRouter();
  const [data,setData] = useState("No-Details")
  const logout = async ()=>{
    try {
       await axios.get('/api/users/logout');
      toast.success("Logout Succesfully");
      router.push('/login')
    } catch (error:any) {
      console.log(error.message)
      toast.error(error.message);
    }
}
  const getUserDetails = async ()=>{
    const res= await axios.get('/api/users/me');
    console.log(res.data);
    setData(res.data.data._id)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
        <h2 className='m-3 p-3 rounded bg-green-500'>{data==="No-Details"? "No-Details":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button 
          onClick={logout} 
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Logout
        </button>
        <button 
          onClick={getUserDetails} 
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Get User Details
          </button>
    </div>
  )
}

export default Profile