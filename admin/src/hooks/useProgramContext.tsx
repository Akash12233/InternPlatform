import { useContext } from "react"
import ProgramContext from "../context/porgramContext"


const useProgramContext = () => {
    const context = useContext(ProgramContext);
    if(!context){
        throw Error('UseProgramContext must be used inside an ProgramContextProvider')
    }
    return context
}

export default useProgramContext