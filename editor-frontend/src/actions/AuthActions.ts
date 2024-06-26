import { AuthActionType } from "../types/Auth";

export const LoginStart = () =><AuthActionType>({
  type: "LOGIN_START",
});

export const LoginSuccess = (jwt: string) =><AuthActionType>({
  type: "LOGIN_SUCCESS",
  jwt: jwt
});

export const LoginFailure = (errorMessage: string) =><AuthActionType>({
    type: "LOGIN_FAILURE",
    errorMessage: errorMessage
  });

export const LogOut = () =><AuthActionType> ({
  type: "LOG_OUT"
})