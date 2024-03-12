import React, { EventHandler, useEffect, useRef, useState } from 'react'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import uploadArea from "../images/upload_area.svg";
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'

import DefaultLayout from '../layout/DefaultLayout'
import { SubmitHandler, useForm } from 'react-hook-form';
import { escapeHtml } from './encode_decode';
import axios from 'axios';

import TableThree from '../components/Tables/TableThree';

interface Program{
  heading: string,
  shortDescription: string,
  description: string,
  image: string,
  duration: number,
  price: number,
  keywords: string[],
  skills: string[],
  _id: string
}

interface Inputs{
  heading: string,
 
  shortDescription: string,
  duration: number,
  price: number,
  keywords: string,
  skills: string
}
const AddPrograms: React.FC = () => {
  const {register, handleSubmit,reset, formState: {errors}} = useForm<Inputs>();
    const [image,setImage] = useState<string | null >("");
    const [descriptionError, setDescriptionError] = useState<Boolean>(false);
    const [value, setValue] = useState('');
    const [file, setFile] = useState<Blob>({} as Blob);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [programData, setProgramData] = useState<Program[]>([]);
    const isInitialFetchRef = useRef(true);
    
    
    const handleChange: EventHandler<any> = (e) =>{
       
        setImage(URL.createObjectURL(e.target.files[0]))
        setFile( e.target.files?.[0])
    }
    
    const onSubmit: SubmitHandler<Inputs> = async(data) => {
     if(value.length === 0){
      setDescriptionError(true)
      return; 
     } 
     else{
      setDescriptionError(false)
      
     }
      const formData = new FormData();
      formData.append("image", file);
      formData.append("heading", data.heading);
      formData.append("shortDescription", data.shortDescription);
      formData.append("description", escapeHtml(value));
      formData.append("duration", `${data.duration}`);
      formData.append("price", `${data.price}`);
      formData.append("keywords", data.keywords);
      formData.append("skills", data.skills);

     console.log(formData.get("image"));
     

      try{
        const addProgram = await axios.post("http://localhost:8000/api/v1/program/addPrograms",formData,{
          headers:{
            "Content-Type":"multipart/form-data",
          }
        })
        console.log(addProgram);
        if(addProgram.status == 200){
          setSuccess("Program added successfully");
          reset()
          setImage("");
          programData.push(addProgram.data.data)
        }
      }catch(error:any){
        console.log(error);
        setError(error?.response.data.errors);
        
      }
    }
    useEffect(()=>{
      const allPrograms = async () => {
        if (isInitialFetchRef.current) { // Check if initial fetch
          const allProgram = await axios.get("http://localhost:8000/api/v1/program/allPrograms");
          setProgramData(allProgram.data.data);
         
          isInitialFetchRef.current = false; // Mark initial fetch done
        }
      };
      console.log(programData);
      allPrograms()
    },[programData,isInitialFetchRef])

 
    
    
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Programs" />

      <div className=" gap-9 grid sm:grid-cols-1">
        <div className="flex flex-col gap-9">
        {error && (
          <div className="bg-red-100 z-50 top-[15%] right-5 fixed border border-red-400 text-red-700 px-4 py-3 rounded " role="alert">
            <div className=' flex justify-between gap-2 items-center'>
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline">{error}</span>
                <span className=" top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-4 w-4 text-red-500" onClick={() => setError("")} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>

            </div>
        </div>
        )}
        {success && (
          <div className="bg-red-100 z-50   top-[15%] right-2 fixed border border-green-400 text-green-700 px-4 py-3 rounded " role="alert">
            <div className=' flex justify-between gap-2 items-center' >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline">{success}</span>
                <span className=" px-4 py-3">
                  <svg className="fill-current h-4 w-4 text-green-500" onClick={()=>setSuccess("")} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>

            </div>
        </div>
        )}
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Programs Form
              </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 ">
                  <div className="w-full flex flex-col justify-center items-center ">
                    <label htmlFor='image' className="mb-2.5 block text-black dark:text-white">
                      Image
                        <img src={(image !="")?(image):(uploadArea) } alt="" className='w-52 h-52 object-cover' />
                        <input
                        type="file"
                        onChange={handleChange}
                        hidden
                        id='image'
                        accept='image/*'
                        placeholder="Upload image"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      
                    </label>
                  </div>
                 

                  
                </div>
                <div className='mb-4.5 flex flex-col xl:flex-row gap-9 ' >
                <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Heading
                    </label>
                    <input
                      type="text"
                      {...register("heading", { required: {value: true, message: "Heading is required"} })}
                      placeholder="Enter Program Heading"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.heading && <p className='text-red-500'>{errors.heading.message}</p>}
                  </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Short Description <span className="text-meta-1">*</span>
                  </label>
                 <textarea  {...register("shortDescription", { })} className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'  placeholder='Enter short description'/>

                  {errors.shortDescription && <p className='text-red-500'>{errors.shortDescription.message}</p>}
                </div>
                </div>
                
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description <span className="text-meta-1">*</span>
                  </label>
                 <ReactQuill theme="snow"  value={value} onChange={(e) =>{setValue(e.valueOf())}} />
                 
                </div>
                {descriptionError && <p className='text-red-500'>Description is required</p>}
                <div className='mb-4.5 flex flex-col xl:flex-row gap-9 ' >
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Duration(in months)
                      </label>
                      <input
                        type="number"
                        min={1}
                        {...register("duration", { required: {value: true, message: "Duration is required"} })}
                        placeholder="Enter Duration"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.duration && <p className='text-red-500'>{errors.duration.message}</p>}
                    </div>
                    <div className='w-full xl:w-1/2' >
                      <label className="mb-2.5 block text-black dark:text-white">
                          Price
                        </label>
                        <input
                          type="number"
                          min={1}
                          {...register("price", { required: {value: true, message: "Price is required"} })}
                          placeholder="Enter Price"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                    </div>
                  
                </div>
                <div className='mb-4.5 flex flex-col xl:flex-row gap-9 ' >
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        KeyWords(comma seperated)
                      </label>
                      <input
                        type="text"
                       {...register("keywords", { required: {value: true, message: "Keywords is required"} })}
                        placeholder="Enter Keywords"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.keywords && <p className='text-red-500'>{errors.keywords.message}</p>}
                    </div>
                    <div className='w-full xl:w-1/2' >
                      <label className="mb-2.5 block text-black dark:text-white">
                          Skills learned (comma seperated)
                        </label>
                        <input
                          type="text"
                         {...register("skills", { required: {value: true, message: "Skills is required"} })}
                          placeholder="Enter Skills"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.skills && <p className='text-red-500'>{errors.skills.message}</p>}
                    </div>
                  
                </div>

             

               

                <button type='submit' className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Add Program 
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
                All Programs
              </h3>
            </div>
            <TableThree packageData={programData || null} setSuccess={setSuccess} setError={setError} setPackageData={setProgramData} />
          </div>
        </div>

        
      </div>
    </DefaultLayout>
  )
}

export default AddPrograms