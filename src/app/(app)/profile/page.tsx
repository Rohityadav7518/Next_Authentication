"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function page() {

  const [data,setData] = useState("")
 const router = useRouter()
const onLogout = async()=>{
    try {
        await axios.get("/api/users/logout")
        router.push('/login')
    } catch (error:any) {
        throw new Error("redirection failed",error)
    }
}


const getDetail = async()=>{
try {
  const res =  await axios.get("/api/users/me")
  console.log(res.data);
  setData(res.data._id)
  
} catch (error) {
  throw new Error("Failed to Get user ")
}
}
  return (
   <>
   <div className="flex flex-col items-center justify-center p-2 text-white" >
     <h1>Profile</h1>

     <h2 className='bg-red-300 font-bold text-white'> <Link href={`/profile/${data}`}> {data} id </Link> </h2>
     <button onClick={onLogout} className='bg-gray-400 border border-gray-300 text-white mt-2'> Logout</button>
     <button onClick={getDetail} className=' border border-gray-300 text-white mt-2 bg-cyan-700'> GetUser</button>


     </div>
   </>
  )
}

export default page