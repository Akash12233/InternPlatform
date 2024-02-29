import { Link } from "react-router-dom"
import { logo } from "../assets"
import { useState } from "react";


const Navbar = () => {
    const [open, setOpen] = useState(false);
  return (
    <nav className="w-full fixed flex border-b-2 gap-4 justify-between items-center bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded" >
        <div className="w-1/3" >
            <Link to={"/"} > <img src={logo} className="h-20 w-auto mr-3 sm:h-9 sm:h-28" alt="logo" /></Link>
            
        </div>
        <div className=" w-1/3 flex flex-col justify-center items-center  font-semibold rounded-full " >
            <button className=" md:hidden text-slate-800 p-2 " onClick={()=>setOpen(!open)} >
                {!open && (
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                 </svg>
                )}
                {open && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    
                )}
               


            </button>
            <ul className="md:flex w-full hidden flex-col md:flex-row justify-between text-slate-800 " >
                <li className="flex md:hidden items-center">
                <input
                        type="search"
                        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-slate-200 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-slate-600 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon1" />
                    <button
                        className="relative z-[2] flex items-center rounded-r bg-black px-6 py-2.5 text-xs font-medium uppercase leading-tight text-[#eee49d] shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        type="button"
                        id="button-addon1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </li>
                <li className="hover:bg-black hover:text-[#eee49d] px-5 py-2 rounded transition cursor-pointer duration-300 ease-in-out" ><Link to="/"> Home</Link></li>
                <li className="hover:bg-black hover:text-[#eee49d] px-5 py-2 rounded transition cursor-pointer duration-300 ease-in-out" ><Link to="/about">About</Link></li>
                <li className="hover:bg-black hover:text-[#eee49d] px-5 py-2 rounded transition cursor-pointer duration-300 ease-in-out" ><Link to="/programs"> Programs</Link></li>
                </ul>
            {open && (
                <ul className="absolute top-20 bg-white  flex w-full p-5 flex-col md:flex-row justify-between text-slate-800 " >
                <li className="flex md:hidden items-center">
                <input
                        type="search"
                        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-slate-200 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-slate-600 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon1" />
                    <button
                        className="relative z-[2] flex items-center rounded-r bg-black px-6 py-2.5 text-xs font-medium uppercase leading-tight text-[#eee49d] shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        type="button"
                        id="button-addon1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </li>
                <li className="hover:bg-black hover:text-[#eee49d] px-5 py-2 rounded transition cursor-pointer duration-300 ease-in-out" ><Link to="/"> Home</Link></li>
                <li className="hover:bg-black hover:text-[#eee49d] px-5 py-2 rounded transition cursor-pointer duration-300 ease-in-out" ><Link to="/about">About</Link></li>
                <li className="hover:bg-black hover:text-[#eee49d] px-5 py-2 rounded transition cursor-pointer duration-300 ease-in-out" ><Link to="/programs"> Programs</Link></li>
                </ul>
            )}
            
        </div>
        <div className=" w-1/3 flex justify-end gap-5 " >
            <div className="flex w-2/3" >

                    <input
                        type="search"
                        className="relative m-0 hidden md:flex  -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-slate-200 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-slate-600 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon1" />
                    <button
                        className="relative z-[2]  hidden md:flex flex items-center rounded-r bg-black px-6 py-2.5 text-xs font-medium uppercase leading-tight text-[#eee49d] shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        type="button"
                        id="button-addon1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
            </div>
            <button className="bg-black md:w-1/3 w-full text-[#eee49d] py-2 px-4 rounded font-semibold " ><Link to="/login">Login</Link></button>
        </div>
    </nav>
  )
}

export default Navbar