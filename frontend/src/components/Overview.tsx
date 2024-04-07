/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

const Overview: React.FC<any> = ({programDetails}) => {
  return (
    <section className='w-full flex my-5 flex-col md:flex-row justify-center items-center' >
            <div className='md:w-1/2 w-full flex flex-col justify-center items-center' >
                    <p className='text-lg text-black text-center' >{programDetails?.description}</p>
            </div>
            <div className='md:w-1/2 w-full flex flex-col justify-center items-center' >
                <div className=' md:w-1/2 mx-auto w-3/4 border-2 border-[#eee49d] p-5' >
                    <h1 className='text-2xl font-semibold text-black text-center pb-2 mt-2 border-b-2 border-[#eee49d] mb-5' >Skills you will learn</h1>
                    <div className='flex gap-3 flex-wrap w-full justify-center items-center' >
                        {programDetails?.skills.map((skill:any, index: number)=>{
                            return <p key={index} className='text-lg border-2 border-[#eee49d] px-3 py-2 rounded-full  text-[#eee49d] bg-black text-center' >{skill}</p>
                        })}

                    </div>

                </div>
                
            </div>
            
        </section>
  )
}

export default Overview