import React from "react"
import { company1, company2, company3, company4 } from "../assets"


const Partners: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center " >
        <h1 className="text-3xl font-semibold" >Our Partners</h1>
        <hr className="h-2 bg-black w-ful my-4 text-black" />
        <div className="w-full px-2 flex overflow-x-scroll justify-between items-center" >
            
            <img src={company1} className="w-1/4  object-fit h-auto" alt="Company 1" />
            <img src={company2} className="w-1/4  object-fit h-auto" alt="Company 2" />
            <img src={company3} className="w-1/4  object-fit h-auto" alt="Company 3" />
            <img src={company4} className="w-1/4 object-fit h-auto" alt="Company 4" />
        </div>

    </div>
  )
}

export default Partners