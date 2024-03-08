/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { internshipDetails, tasks } from './intern';
import ProgramBanner from '../components/ProgramBanner';
import Overview from '../components/Overview';
import TasksOverview from '../components/TasksOverview';


interface ProgramDetails {
    program_id: number,
    heading: string,
    description: string,
    duration: number,
    skills: string[]
    keywords: string[],
    price: string,
    image: string

}
interface Tasks {
    heading: string,
    description: string,
    program_id: number,
    skills: string[],
    level: string
}



const ProgramItem: React.FC = () => {
    const {id} = useParams();
    const [programDetails, setProgramDetails]  = useState<ProgramDetails | null>(null);
    const [taskDetails, setTaskDetails] = useState<Tasks[] | null>(null);
    console.log(id);
    // const accessToken= localStorage.getItem("accessToken");
    // const [error, setError] = useState("");
  
   

    useEffect(()=>{
        // const getProgram = async()=>{
        //     try {
                
                
                
        //         const program_details = await axios.post(`http://localhost:8000/api/v1/program/programbyid`,{
        //             id: '4e45345evgvjgv55r56'
        //         },{
        //             headers:{
        //                 Authorization: `Bearer ${accessToken}`
        //             }
        //         });
        //         console.log(program_details);
        //         setProgramDetails(program_details.data.program);
                
        //     } catch (error:any) {
        //         console.log(error);
        //         setError(error.response.data.data)
        //         return null
        //     }
        // }
        // getProgram();
        const i = internshipDetails.filter((program:any)=>program.program_id == id);
        const taskk = tasks.filter((task:any)=>task.program_id == id);
        setTaskDetails(taskk);
        setProgramDetails(i[0]);

        
    },[]);
    
  return (
    <>
        {/* {error} */}
        <ProgramBanner programDetails={programDetails} />
        <div className='w-full flex my-5 flex-col  justify-center items-center'>
            <h1 className='text-3xl font-semibold text-black text-center mt-10' >About Internship</h1>
                    <hr className=' w-1/6 h-1 my-2  mb-5 bg-[#eee49d]' />

        </div>
        <Overview programDetails={programDetails} />
        <TasksOverview tasks={taskDetails} />
        <div className='border-t-8 border-[#eee49d] flex flex-col md:flex-row justify-center items-center p-10' >
            <h1 className='text-3xl font-semibold text-black text-center w-1/2  ' >Not the right Internship?</h1>
            <Link to={"/programs"} className='border-2 md:w-1/4 w-3/4 mx-auto block border-[#eee49d] px-5 py-2 rounded-lg text-black  text-center  hover:bg-[#eee49d]' >Browse Other Internships</Link>
        </div>
    </>
  )
}

export default ProgramItem