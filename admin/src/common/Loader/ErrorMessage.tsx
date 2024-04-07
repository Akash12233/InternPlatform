import React from 'react'

interface Props{
    error: string,
    setError: (error: string) => void

}
const ErrorMessage: React.FC<Props> = ({error, setError}) => {
    if(error){
        return (<div className="bg-red-100 z-50 top-[15%] right-5 fixed border border-red-400 text-red-700 px-4 py-3 rounded " role="alert">
        <div className=' flex justify-between gap-2 items-center'>
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{error}</span>
            <span className=" top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-4 w-4 text-red-500" onClick={() => setError("")} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>

        </div>
    </div>)
    }

}

export default ErrorMessage