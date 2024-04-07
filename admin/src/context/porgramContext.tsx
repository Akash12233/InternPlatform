import axios from "axios";
import React, { useEffect } from "react";
import { createContext } from "react";

interface Program {
    heading: string,
    id: number,
    shortDescription: string,
    description: string,
    image: string,
    duration: number,
    price: number,
    keywords: string[],
    skills: string[],
    _id: string
}

interface ProgramContext {
    program: Program[] | null
    dispatch: React.Dispatch<any>
}

const ProgramContext = createContext<ProgramContext | null>(null);

export default ProgramContext

const programReducer = (state: any, action: any) => {

    switch (action.type) {
        case 'SET_PROGRAM':
            return {program: action.payload}
        case 'CLEAR_PROGRAM':
            return {program:null}
        case 'UPDATE_PROGRAM':
            return {program: action.payload}
        default:
            return state
    }
}

export const ProgramContextProvider = (props: any) => {

    const [state, dispatch] = React.useReducer(programReducer, null);
    useEffect(() => {
        const program = localStorage.getItem('program')
        if (program) {
            dispatch({ type: 'SET_PROGRAM', payload: JSON.parse(program) })
        }
        else {
            const fetch = async () => {
                const res = await axios.get('api/v1/program/allPrograms')
              
                localStorage.setItem('program', JSON.stringify(res.data.data))
                dispatch({ type: 'SET_PROGRAM', payload: res.data.data })
            }
            fetch()
           
        }
    },[])
    console.log(state);
    
    return (
        <ProgramContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </ProgramContext.Provider>
    )

    
}