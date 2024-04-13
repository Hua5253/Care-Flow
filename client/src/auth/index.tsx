import { ReactNode, createContext, useState } from "react";
import authService from "../services/auth-service";

// All the types of updates to our auth state that can be processed
export const AuthActionType = {
  //   GET_LOGGED_IN: "GET_LOGGED_IN",
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
};

interface Props {
  children: ReactNode;
}
const AuthContext = createContext({});

function AuthContextProvider({ children }: Props) {
  const [auth, setAuth] = useState<any>({
    user: null,
    loggedIn: false,
    errorMsg: "",
  });
  const authReducer = (action: any) => {
    const { type, payload } = action;
    switch (type) {
      case AuthActionType.LOGIN_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: payload.loggedIn,
          errorMsg: payload.errorMsg,
        });
      }
      case AuthActionType.LOGOUT_USER: {
        return setAuth({
          user: null,
          loggedIn: false,
          errorMsg: "",
        });
      }
    }
  };

  auth.loginUser = async function (username: string, password: string) {
    try {
      const response = await authService.login({ username, password });
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.LOGIN_USER,
          payload: {
            user: response.data.user,
            loggedIn: true,
            errorMsg: null,
          },
        });
        console.log("login success");
        // navigate(`/`);
      }
      if (response.status === 401) {
        console.log("unauthorized");
      }
    } catch (error: any) {
      authReducer({
        type: AuthActionType.LOGIN_USER,
        payload: {
          user: auth.user,
          loggedIn: false,
          errorMsg: error.response.data.errorMsg,
        },
      });
    }
  };
  auth.logoutUser = async function () {
    try {
      const response = await authService.logout();
      if (response.status === 200) {
        console.log("logout user");
        authReducer({
          type: AuthActionType.LOGOUT_USER,
          payload: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
}
export default AuthContext;
export { AuthContextProvider };
