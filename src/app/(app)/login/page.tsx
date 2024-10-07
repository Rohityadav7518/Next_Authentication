"use client"

import axios from 'axios';
import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function page() {
    const [user, setUser] = React.useState({
      
        email: "",
        password: "",
    })
 const router = useRouter()
    const onLogin = async ()=>{
        try {
            const response = axios.post("/api/users/login",user)
            console.log(response);
router.push('/profile')
            
        } catch (error) {
            console.log("LOgin Failed",error);
            
        }
    }

    return (
        <>
            <div className="flex   items-center justify-center min-h-screen p-2 flex-col ">

                <h1>LOGIN </h1>
                <hr />


                <label htmlFor="email">email</label>
                <input type="text" id='email' value={user.email}
                    onChange={(e) => setUser({ ...user, email:e.target.value })} />
                <label htmlFor="password">password</label>
                <input type="text" id='password' value={user.password}
                    onChange={(e) => setUser({ ...user, password:e.target.value })} />
 <button onClick={onLogin} className='bg-blue-400 border
  border-gray-400 p-2 font-bold '>Login</button>
  <p>  <Link href={'/signup'}>Signup Here</Link> </p>
            </div>
        </>
    )
}

export default page