import React from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Img from '../../../components/Img';

const Profile: React.FC = () => {
    const {user} = useAuthContext();
  return (
    <section className='h-96 flex  items-center justify-center  w-full  border-b-2 border-black bg-[#fde68a]' >
        <div className='w-1/2 h-1/2 rounded-full flex items-center justify-center' >
            <Img src={`${user?.avatar}`} className={`w-56 object-cover rounded-full bg-clip h-56`} />
        
        
        </div>
        <div className='w-1/2 border-l-2 pl-1 border-black' >
            <h1 className='text-7xl font-semibold m-2' > {user?.username}</h1>
             <p className='text-xl m-2 font-medium' >{user?.firstname} {user?.lastname}</p>
             <p className='text-xl m-2 font-medium' >{user?.email}</p>
        </div>
    </section>
  )
}

export default Profile