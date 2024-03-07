/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useReducer } from "react";

type User = {
    avatar: string,
    email: string,
    firstname: string,
    lastname: string,
    username: string
}

type AuthContextType = {
    refreshToken: any;
    accessToken: any;   
    user: User | null
    dispatch: any
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const authReducer = (state:any, action:any) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload,refreshToken: action.refreshToken, accessToken: action.accessToken }
        case 'LOGOUT':
            return { user: null, refreshToken: null, accessToken: null }
        default:
            return state
    }

}

export const AuthContextProvider = (props:any) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    useEffect(() => {
        const user = localStorage.getItem('user')
        const refreshToken = localStorage.getItem('refreshToken')
        const accessToken = localStorage.getItem("accessToken")
        if (user) {
            dispatch({ type: 'LOGIN', payload: JSON.parse(user).user,refreshToken: refreshToken, accessToken: accessToken })
        }
        else {
            dispatch({ type: 'LOGOUT' })
        }
    },[])
    
    console.log("AuthContext state: ", state)
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}