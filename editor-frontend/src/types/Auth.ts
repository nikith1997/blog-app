export interface AuthStateType {
    isFetching: boolean,
    jwt?: string | null,
    error: boolean,
    errorMessage?: string,
}

export interface AuthActionType {
    type: string
    jwt?: string | null
    errorMessage?: string
}

export interface AuthContextType extends AuthStateType {
    authDispatch?: (action: AuthActionType) => void
}