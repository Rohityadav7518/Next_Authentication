import React from 'react'

function page(params:any) {
  return (
   <>
   
    <div className=" p-4 flex flex-col items-center justify-center min-h-screen">
        <h1 className='bg-red-400 font-bold  mt-2'> profile {params.id}</h1>
    </div>
   </>
  )
}

export default page