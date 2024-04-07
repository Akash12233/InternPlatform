import React from 'react'
interface Props{
    success: string,
    setSuccess: (error: string) => void

}
const SuccessMessage: React.FC<Props> = ({success, setSuccess}) => {
    
  return (
    <div className="bg-red-100 z-50   top-[15%] right-2 fixed border border-green-400 text-green-700 px-4 py-3 rounded " role="alert">
                            <div className=' flex justify-between gap-2 items-center' >
                                <strong className="font-bold">Success!</strong>
                                <span className="block sm:inline">{success}</span>
                                <span className=" px-4 py-3">
                                    <svg className="fill-current h-4 w-4 text-green-500" onClick={() => setSuccess("")} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                </span>

                            </div>
                        </div>
  )
}

export default SuccessMessage