import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import ReactQuill from 'react-quill';
import Loader from '../common/Loader';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { escapeHtml } from './encode_decode';
import useProgramContext from '../hooks/useProgramContext';
import useTaskContext from '../hooks/useTaskContext';
import ErrorMessage from '../common/Loader/ErrorMessage';
import SuccessMessage from '../common/Loader/SuccessMessage';

interface Program {
    heading: string,
    id: number,
    shortDescription: string,
    description: string,
    image: string,
    duration: number,
    price: number,
    keywords: string[],
    skills: string[],
    _id: string
}


interface Inputs {
    heading: string,
    program_id: number,
    task_id: number,
    description: string
}
const SubTask: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
    const {program: programData } = useProgramContext();
    const [descriptionError, setDescriptionError] = useState<Boolean>(false);
    const [value, setValue] = useState('');
    const {task: taskData,dispatch: dispatchTask} = useTaskContext();
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [file, setFile] = useState<Blob>({} as Blob);
   const [subTasks, setSubTasks] = useState<any[]>([]);

    const [loading, setLoading] = useState<Boolean>(false);

    const [selectedOption, setSelectedOption] = useState<number | string>(0);
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [selectedOption1, setSelectedOption1] = useState<number | string>('');
    const [isOptionSelected1, setIsOptionSelected1] = useState<boolean>(false);

    const changeTextColor = () => {
        setIsOptionSelected(true);
       
    };
    const changeTextColor1 = () => {
        setIsOptionSelected1(true);
    };


   

 

    const deleteHandler = async (id: number) => {
        console.log(id);
        try {
            const res = await axios.delete(`api/v1/subtask/deletesubtask`, {
                data: {
                    subTask_id: id,
                }
            });
            console.log(res);
            setSuccess(res.data.message);
            setSubTasks(subTasks.filter((item: any) => item.id !== id))
           
        } catch (error: any) {
            console.log(error);
            setError(error.response.data.message);
        }
    }
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true)
        console.log(data);

        if (value.length === 0) {
            setDescriptionError(true)
            return;
        }
        else {
            setDescriptionError(false)

        }
        const formData = new FormData();
        formData.append("solution", file);
        formData.append("heading", data.heading);
     

        formData.append("description", escapeHtml(value));
        formData.append("task_id", `${data.task_id}`);
      
     
        




        try {
            const addtasks = await axios.post("api/v1/subtask/addsubtask", formData,{
                headers:{
                    "Content-Type":"multipart/form-data",
                }
            })
            console.log(addtasks);
            if (addtasks.status == 200) {
                setSuccess("Task added successfully");
                setError("");
                reset()
                
               
            }
            setLoading(false)
        } catch (error: any) {
            console.log(error);
            setError(error?.response.data.errors);
            setSuccess("");
            setLoading(false)
        }
    }
    
   
// console.log(register("program_id"));
// console.log(getValues("program_id"));
useEffect(()    => {
    const allSubTasks = async() =>{
        const res = await axios.get("api/v1/subtask/allsubtasks")
        // console.log(res);
        setSubTasks(res.data.data)
    }
    allSubTasks()
},[])

console.log(subTasks);





    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Sub Tasks" />

            <div className=" gap-9 grid sm:grid-cols-1">
                <div className="flex flex-col gap-9">
                    <ErrorMessage error={error} setError={setError} />
                    {success && <SuccessMessage success={success} setSuccess={setSuccess} />}
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                               Sub Tasks Form
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="p-6.5">
                                
                                <div className='mb-4.5 flex flex-col xl:flex-row gap-9 ' >
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Heading
                                        </label>
                                        <input
                                            type="text"
                                            {...register("heading", { required: { value: true, message: "Heading is required" } })}
                                            placeholder="Enter Task Heading"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {errors.heading && <p className='text-red-500'>{errors.heading.message}</p>}
                                    </div>
                                    <div className='w-full xl:w-1/2' >
                                        <label className="mb-3 block text-black dark:text-white">
                                            Select Program
                                        </label>

                                        <div className="relative z-20 bg-white dark:bg-form-input">
                                            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                </svg>

                                            </span>

                                            <select
                                                value={selectedOption}
                                                
                                                onChange={(e) => {
                                                 
                                                    setSelectedOption(Number(e.target.value));
                                                   
                                                    
                                                    changeTextColor();
                                                    
                                                 
                                                }}
                                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
                                                    }`}
                                            >

                                                <option value="" defaultValue={""} className="text-body dark:text-bodydark">
                                                    Select Program
                                                </option>
                                                { programData &&
                                                    programData?.map((item, index) => {
                                                    
                                                        
                                                        return (
                                                        <option value={item.id} key={index} className="text-body dark:text-bodydark">
                                                            {item.heading}
                                                        </option>
                                                    )})
                                                }

                                            </select>

                                            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                            fill="#637381"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                        {errors.program_id && <p className='text-red-500'>{errors.program_id.message}</p>}
                                    </div>
                                    <div className='w-full xl:w-1/2' >
                                        <label className="mb-3 block text-black dark:text-white">
                                            Select Task
                                        </label>

                                        <div className="relative z-20 bg-white dark:bg-form-input">
                                            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                </svg>

                                            </span>

                                            <select
                                                value={selectedOption1}
                                                {...register("task_id", { required: { value: true, message: "Please Select Task" } })}
                                                onChange={(e) => {
                                                    setSelectedOption1(Number(e.target.value));
                                                    changeTextColor1();
                                                }}
                                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected1 ? 'text-black dark:text-white' : ''
                                                    }`}
                                            >

                                                <option value="" disabled className="text-body dark:text-bodydark">
                                                    Select Task
                                                </option>
                                                { taskData &&
                                                    taskData?.map((item, index) => {
                                                        if(item.program_id === selectedOption)
                                                        return(
                                                            <option value={item.id} key={index} className="text-body dark:text-bodydark">
                                                                {item.heading}
                                                            </option>
                                                        )
                                                        else{
                                                            return null
                                                        }
                                                    })
                                                }

                                            </select>

                                            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                            fill="#637381"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                        {errors.program_id && <p className='text-red-500'>{errors.program_id.message}</p>}
                                    </div>
                                    

                                </div>
                                <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Solution
                                        </label>
                                        <input
                                            type="file"
                                            onChange={(e: any) => {
                                                setFile(e.target.files[0]);
                                            }}
                                            placeholder="Enter Task Heading"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {errors.heading && <p className='text-red-500'>{errors.heading.message}</p>}
                                    </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Description <span className="text-meta-1">*</span>
                                    </label>
                                    <ReactQuill theme="snow" value={value} onChange={(e) => { setValue(e.valueOf()) }} />

                                </div>
                                {descriptionError && <p className='text-red-500'>Description is required</p>}






                                <button type='submit' className={`flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 ${loading && "cursor-not-allowed"}`}>
                                    {loading ?
                                        (<Loader />) : ("Add Sub Task")}


                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col gap-9">

                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                All Sub Tasks
                            </h3>
                        </div>
                        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                            <div className="max-w-full overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                            
                                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                                Heading
                                            </th>
                                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                                Program Heading 
                                            </th>
                                            
                                           
                                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                                solution
                                            </th>
                                           
                                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subTasks?.map((packageItem: any, key: number) => (
                                            <tr key={key}>
                                                
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <p className="text-black dark:text-white">
                                                        {packageItem.heading}
                                                    </p>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <p className="text-black dark:text-white">
                                                        {programData?.filter((item: any) => item.id === packageItem.id)[0]?.heading}
                                                    </p>
                                                </td>
                                                
                                                
                                                <td className="border-b  border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <div className="flex flex-wrap gap-2" >
                                                        <a href={`${packageItem.solutiongiven}`} target="_blank">Click Here</a>
                                                    </div>

                                                </td>
                                                
                                               
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <div className="flex items-center space-x-3.5">
                                                        <button className="hover:text-primary">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                            </svg>

                                                        </button>
                                                        <button className="hover:text-primary" onClick={() => deleteHandler(packageItem.id)}>
                                                            <svg
                                                                className="fill-current"
                                                                width="18"
                                                                height="18"
                                                                viewBox="0 0 18 18"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                                                    fill=""
                                                                />
                                                            </svg>
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </DefaultLayout>
    )
}

export default SubTask