/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  
    
    Chip,
  } from "@material-tailwind/react";

  type Props={
    image: string,
    title: string,
    description: string,
    duration: number,
    skills: string
  }
const CardItem: React.FC<Props> = ({image, title, description, duration, skills}) => {
  const skill = skills.split(",");
  return (
    <Card className="w-full max-w-[26rem] h-96 shadow-lg"  placeholder={undefined}>
    <CardHeader floated={false} color="blue-gray"  placeholder={undefined}>
      <img
        src={image}
        alt={title}
        className='object-cover w-full h-full'
      />
      <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      
    </CardHeader>
    <CardBody  placeholder={undefined}>
      <div className="mb-3 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray" className="font-medium"  placeholder={undefined}>
         {title}
        </Typography>
        <Typography
                      color="blue-gray"
                      className="flex items-center gap-1.5 font-normal"  placeholder={undefined}        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>

         {duration } Months
        </Typography>
      </div>
      <Typography color="gray"  placeholder={undefined}>
        {description}
      </Typography>
      <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
        {skill.map((item, index) => (
          <Chip
            key={index}
            
            className='text-slate-600 bg-[#eee49d]'
            value={item}
            
          />
        ))}
      </div>
    </CardBody>
    <CardFooter className="pt-3"  placeholder={undefined}>
      <Button size="lg" fullWidth={true} className='text-[#eee49d]'  placeholder={undefined}>
        Apply Now
      </Button>
    </CardFooter>
  </Card>
  )
}

export default CardItem