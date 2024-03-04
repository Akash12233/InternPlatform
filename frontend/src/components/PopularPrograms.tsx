import React from 'react'
import CardItem from './Card'
import logo from "../assets/Accenture-logo.png";
const PopularPrograms: React.FC = () => {
  return (
    <div className='flex flex-col items-center' >
        <h1 className='text-3xl font-semibold' >Our Popular Programs</h1>
        <hr className=' w-1/6 h-1 my-5 bg-[#eee49d]'  />
        <div>
            <CardItem image={logo} title={'Accenture'} description={'This is internships'} duration={3} skills={'HTML, CSS, JavaScript'} />
        </div>
    </div>
  )
}

export default PopularPrograms