"use client";

import Link from 'next/link';
import React, {useEffect} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const router=useRouter();
  const [user,setUser] =React.useState({
    email:"",
    password:"",
  });

   const [buttonDisabled,setButtonDisabled]= React.useState(false);
  const [loading,setLoading]= React.useState(false);

  const onLogin = async()=>{
     try {
         setLoading(true);
         const response= await axios.post('/api/users/login',user);
         console.log("Login success",response.data)
         toast.success("Login Successfully");
         router.push('/profile')
     } catch (error:any) {
         console.log("Login Failed",error.message);
         toast.error(error.message);
     } finally{
      setLoading(false)
     }
  }

  useEffect(()=>{
   if(user.email.length>0 && user.password.length>0){
      setButtonDisabled(false);
   } else{
    setButtonDisabled(true);
   }
  },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4   rounded-xl border-blue-400 ">
       <h1 className='text-2xl'>{loading ? "Processing...":"Login"}</h1>
       <hr />
       <form className='flex flex-col py-2'>
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
          onClick={onLogin}
          className='btn w-[225px] bg-gray-400 p-2 rounded-lg text-white text-center hover:bg-gray-600 my-2'>
         {buttonDisabled ? "No Login":"Login"}</button>
         <Link href='/signup'>Visit Signup Here</Link>
    </div>
  )
}

export default LoginPage