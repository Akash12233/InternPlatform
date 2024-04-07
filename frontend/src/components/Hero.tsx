import { Link } from "react-router-dom"
import { intern } from "../assets"


const Hero = () => {
  return (
    <div className="bg-white  flex relative z-20 justify-center items-center overflow-hidden">
        <div className="container mx-auto px-6 flex relative py-16">
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                <span className="w-20 h-2 bg-gray-800  mb-12">
                </span>
                <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none  text-gray-800">
                Launch your 
                    <span className="text-5xl sm:text-7xl">
                    Journey
                    </span>
                </h1>
                <p className="text-sm sm:text-base text-gray-700 ">
                   
Shape your future. Intern at the forefront of innovation.
                </p>
                <div className="flex mt-8">
                    <Link to="/programs" className="uppercase py-3 px-4 flex gap-2 transition duration-2000 ease-in   rounded-lg bg-black border-2 border-transparent text-[#eee49d] text-md mr-4 hover:bg-[#eee49d] hover:text-black">
                    Explore Internship Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>

                    </Link>
                    
                </div>
            </div>
            <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
                <img src={intern} className="max-w-xs md:max-w-xl m-auto"/>
            </div>
        </div>
    </div>
  )
}

export default Hero