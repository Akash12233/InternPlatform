/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";

const TasksOverview: React.FC<any> = ({tasks}) => {
 
        return (
            <section className='w-full flex flex-col justify-center mt-10 items-center' >
                <h1 className='text-3xl font-semibold text-black text-center' >Tasks Overview</h1>
                <hr className=' w-1/6 h-1 my-5 bg-[#eee49d]'  />
                <div className='w-full h-full  ' >
                    <Tabs value="html" className="" >
                        <TabsHeader  placeholder={undefined} className="bg-transparent"
        indicatorProps={{
          className: "bg-gray-900/10 shadow-none !text-gray-900",
        }}>
                        {tasks?.map((item: any, i:number) => (
                            <Tab key={i} value={item.heading}  placeholder={undefined}>
                            Task {i+1}
                            </Tab>
                        ))}
                        </TabsHeader>
                        <TabsBody  placeholder={undefined}>
                        {tasks?.map((item:any, i:number) => (
                            <TabPanel key={i} value={item.heading} className='md:w-1/2 w-full md:ml-52' >
                                <p className='text-xl md:text-3xl font-bold ' >{item.heading}</p>
                                <p className='text-md font-semibold text-green-300' >{item.level}</p>
                                <div className='flex gap-3 flex-wrap w-full my-3 ' >
                                    {item.skills.map((skill:string, i:number) => (
                                        <p key={i} className='text-lg font-semibold px-3 py-2 rounded-full text-[#eee49d] bg-black text-center ' >{skill}</p>
                                    ))}

                                </div>
                            {item.description}
                            </TabPanel>
                        ))}
                        </TabsBody>
                    </Tabs>

                </div>

            </section>
        );
      }

export default TasksOverview