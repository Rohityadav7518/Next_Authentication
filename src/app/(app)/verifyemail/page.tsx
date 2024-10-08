"use client"

import axios from "axios"
import Link from "next/link";
import { useEffect, useState } from "react"

export default function verifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data);

        }
    }

    useEffect(()=> {
        const urlToken = window.location.search.split("=")
        [1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail()
        }
    }, [token])


    return(
        <>
        
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className=" text-2xl font-bold">   VerifyEmail </h1>
            <h2 className=" font-bold text-2xl">{ token ? `${token}`: "no Token"} </h2>


            { verified &&(
                <div>
                    <h2> Email Verified </h2>
                    <Link href={"/login"}> Login</Link>
                </div>
            )}
            { error &&(
                <div>
                    <h2> Something Went Wrong </h2>
                   
                </div>
            )}
        </div>
        </>
    )
}
