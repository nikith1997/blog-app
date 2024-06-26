import axios from "axios"
import { Dispatch } from "react"
import { AuthActionType } from "../types/Auth"
import { LoginFailure, LoginStart, LoginSuccess } from "../actions/AuthActions"

interface UserCredentials {
    email: string
    password: string
}

export const login = async (userCredentials: UserCredentials, dispatch: Dispatch<AuthActionType>) => {
    dispatch(LoginStart())
    try {
        const endpoint = `${import.meta.env.VITE_API_URL}/api/user/login`
        console.log(endpoint)
        const response = await axios.post(endpoint, userCredentials)
        dispatch(LoginSuccess(response.data.token))
    }
    catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) {
            dispatch(LoginFailure(error.message))
        }
        else {
            dispatch(LoginFailure("Unknown error occurred"))
        }
    }
    
}