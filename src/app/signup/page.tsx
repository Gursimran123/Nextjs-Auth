"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import {toast} from 'react-hot-toast';

const SignUpPage = () => {
  const router= useRouter();
  const [user,setUser] =React.useState({
    email:"",
    password:"",
    username:"",
  });
  const [buttonDisabled,setButtonDisabled]= React.useState(false);
  const [loading,setLoading]= React.useState(false);

  const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            toast.success("Signup Successfully");
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisabled(false);
    } else{
      setButtonDisabled(true);
    }
  },[user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 rounded-xl border-blue-400 ">
       <h1 className='text-2xl'>{loading ? "Processing...":"Signup"}</h1>
       <hr />
       <form className='flex flex-col py-2'>
       <label htmlFor="username">Username</label>
       <input 
         id='username'
         className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
         type="text"
         value={user.username}
         onChange={(e)=>setUser({...user,username:e.target.value})}
         placeholder='username'
         />
       <label htmlFor="email">Email</label>
       <input 
         id='email'
         className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
         type="email"
         value={user.email}
         onChange={(e)=>setUser({...user,email:e.target.value})}
         placeholder='email'
         />
       <label htmlFor="password">Password</label>
       <input 
         id='password'
         className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
         type="password"
         value={user.password}
         onChange={(e)=>setUser({...user,password:e.target.value})}
         placeholder='password'
         />
        
         </form>
          <button 
          onClick={onSignup}
          className='btn w-[220px] bg-gray-400 p-2 rounded-lg text-white text-center hover:bg-gray-600 my-2' >
          {buttonDisabled ? "No Signup":"Signup"}</button>
         <Link href='/login'>Visit Login Here</Link>
    </div>
  )
}

export default SignUpPage