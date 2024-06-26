import {AuthActionType, AuthStateType } from "../types/Auth";

const AuthReducer = (state: AuthStateType, action: AuthActionType): AuthStateType => {
    switch(action.type) {
        case "LOGIN_START":
            return {
                isFetching: true,
                error: false,
            }
        case "LOGIN_SUCCESS":
            return {
                jwt: action.jwt,
                isFetching: false,
                error: false
            }
        case "LOGIN_FAILURE":
            return {
                isFetching: false,
                error: true,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
}

export default AuthReducer