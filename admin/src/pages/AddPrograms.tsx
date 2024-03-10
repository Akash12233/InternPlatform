import React, { EventHandler, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import uploadArea from "../images/upload_area.svg";
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import SelectGroupOne from '../components/Forms/SelectGroup/SelectGroupOne'
import DefaultLayout from '../layout/DefaultLayout'

const AddPrograms: React.FC = () => {
    const [image,setImage] = useState<string | null >("");
    const [value, setValue] = useState('');
    const handleChange: EventHandler<any> = (e) =>{
       
        setImage(URL.createObjectURL(e.target.files[0]))
    }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Programs" />

      <div className=" gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Programs Form
              </h3>
            </div>
            <form action="#">
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
                      placeholder="Enter Program Heading"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Short Description <span className="text-meta-1">*</span>
                  </label>
                 <textarea className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary' name="" id="" placeholder='Enter short description'>

                 </textarea>
                </div>
                </div>
                
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description <span className="text-meta-1">*</span>
                  </label>
                 <ReactQuill theme="snow" value={value} onChange={setValue} />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Select subject"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <SelectGroupOne />

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        
      </div>
    </DefaultLayout>
  )
}

export default AddPrograms