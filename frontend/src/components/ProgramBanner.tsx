/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { banner } from '../assets'
import { Link } from 'react-router-dom';

const ProgramBanner: React.FC<any> = ({programDetails}) => {
    console.log(programDetails);
    
  return (
    <>
        <section className='flex flex-col md:flex-row gap-5 justify-center text-white items-center ' style={{backgroundImage: `url(${banner})`, backgroundSize: 'cover'}} >
           
           <div className='md:w-1/2 w-full  md:m-10 h-56  bg-[#eee49d] flex flex-col justify-center  rounded-md  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100' > 
               <h1 className='md:text-7xl text-3xl font-semibold text-[#eee49d] ml-5' >{programDetails?.heading}</h1>
               <p className='ml-5 md:text-lg text-sm text-green-50'>{programDetails?.description}</p>
           </div>
           <div className=' w-1/2 hidden md:flex md:m-10 m-5  justify-center '>
               <div className='p-5 flex flex-col  w-96 bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100  ' >
                   <img src={programDetails?.image} alt="" className='w-1/2 mx-auto ' />
                   <hr />
                   <p className='font-semibold mt-5' > Price: <span className='text-[#eee49d]' > {programDetails?.price}/-</span></p>
                   <p className='font-semibold my-5' > Duration: <span className='text-[#eee49d]' > {programDetails?.duration} Months</span></p>
                   <div className='flex flex-wrap gap-2 mb-5' >
                        <span className='text-white font-semibold' >Keywords:</span>
                        {programDetails?.keywords.map((keyword:any, index: number)=>(
                            <p key={index} className='text-[#eee49d] font-semibold p-2 rounded-md bg-[#eee49d] text-black '>{keyword}</p>
                        ))}
                    </div>
                   <Link to={"/apply"} reloadDocument className='bg-black text-[#eee49d] text-center py-3 w-1/2 mx-auto rounded-md' >Apply</Link>

               </div>
           </div>
       </section>
       <div className=' w-full  md:m-10 my-5 flex md:hidden justify-center '>
               <div className='p-5 flex flex-col shadow-xl text-white  w-96 bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border border-gray-100  ' >
                   <img src={programDetails?.image} alt="" className='w-1/2 mx-auto ' />
                   <hr />
                   <p className='font-semibold mt-5' > Price: <span className='text-[#eee49d]' > {programDetails?.price}/-</span></p>
                   <p className='font-semibold my-5' > Duration: <span className='text-[#eee49d]' > {programDetails?.duration} Months</span></p>
                   <div className='flex flex-wrap gap-2 mb-5' >
                        <span className='text-white font-semibold' >Keywords:</span>
                        {programDetails?.keywords.map((keyword:any, index: number)=>(
                            <p key={index} className='text-[#eee49d] font-semibold p-2 rounded-md bg-[#eee49d] text-black '>{keyword}</p>
                        ))}
                    </div>
                   <Link to={"/apply"} reloadDocument className='bg-black text-[#eee49d] py-3 w-1/2 mx-auto rounded-md' >Apply Now</Link>

               </div>
       </div>
    </>
  )
}

export default ProgramBanner