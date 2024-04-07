import { useContext } from "react";
import taskContext from "../context/taskContext";

 const useTaskContext = () => {
    const context = useContext(taskContext);
    if(!context){
        throw Error('useTaskContext must be used inside an TaskContextProvider')
    }
    return context
}

export default useTaskContext