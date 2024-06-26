import { createContext, useEffect, useReducer, ReactNode } from "react"
import authReducer from "../reducers/AuthReducer"
import {AuthContextType} from "../types/Auth"

const jwt = localStorage.getItem("jwt")

const initial_context: AuthContextType = {
    isFetching: false,
    jwt: jwt,
    error: false
}

type AuthContextProviderType = {
    children: ReactNode
}

export const AuthContext = createContext(initial_context)

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
    const [authState, authDispatch] = useReducer(authReducer, initial_context)
    useEffect(() => {
        if (authState.jwt !== undefined && authState.jwt !== null) {
        localStorage.setItem("jwt", authState.jwt)
        }
    }, [authState])
    return (
        <AuthContext.Provider value={{
            isFetching: authState.isFetching,
            jwt: (authState.jwt !== undefined)? authState.jwt: null,
            error: authState.error,
            errorMessage: authState.errorMessage,
            authDispatch: authDispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}