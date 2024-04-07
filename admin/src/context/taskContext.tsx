import axios from "axios"
import React, { useEffect } from "react"
import { createContext } from "react"

interface Task {
    heading: string,
    description: string,
    skills: string[],
    id: number,
    program_id: number
} 
interface TaskContext {
    task: Task[]
    dispatch: React.Dispatch<any>
}

const taskContext = createContext<TaskContext | null>(null)

export default taskContext

const taskReducer = (state: any, action: any) => {

    switch (action.type) {
        case 'SET_TASK':
            return {task: action.payload}
        case 'CLEAR_TASK':
            return {task:null}
        case 'UPDATE_TASK':
            return {task: action.payload}
        default:
            return state
    }
}

export const TaskContextProvider = (props: any) => {

    const [state, dispatch] = React.useReducer(taskReducer, null);
    useEffect(() => {
        const task = localStorage.getItem('task')
        if (task) {
            dispatch({ type: 'SET_TASK', payload: JSON.parse(task) })
        }
        else {
            const fetch = async () => {
                const res = await axios.get('api/v1/task/allTasks')
              
                localStorage.setItem('task', JSON.stringify(res.data.data))
                dispatch({ type: 'SET_TASK', payload: res.data.data })
            }
            fetch()
           
        }
    },[])
    console.log(state);
    
    return (
        <taskContext.Provider
            value={{
                ...state,
                dispatch
            }}
        >
            {props.children}
        </taskContext.Provider>
    )
}

