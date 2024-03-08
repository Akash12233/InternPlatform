 import React from 'react'

import CardItem from "../components/Card"
import smapleInternships from "./intern"
interface item{
  _id: number,
  image: string,
    title: string,
    description: string,
    duration: number,
    skills: string
}
const Program: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center ' >
      <h1 className='text-3xl font-semibold' >Our All Programs</h1> 
      <hr className=' w-1/6 h-1 my-5 bg-[#eee49d]'  />
      <div className='flex flex-wrap justify-center items-center ' >
          {smapleInternships.map((item:item)=>{
            return(
              <CardItem key={item._id} id={item._id} image={item.image} title={item.title} description={item.description} duration={item.duration} skills={item.skills} />
            )
          })}

      </div>
    </div>
  )
}

export default Program