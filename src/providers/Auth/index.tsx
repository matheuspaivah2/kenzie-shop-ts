import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import api from "../../services/api";
import { History } from "history";

interface AuthContextProps {
  token: string;
  setAuth: Dispatch<SetStateAction<string>>;
  signIn: (
    userData: UserData,
    setError: Dispatch<SetStateAction<boolean>>,
    history: History
  ) => void;
}

interface UserData {
  username: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = localStorage.getItem("token") || "";

  console.log(token);

  const [auth, setAuth] = useState<string>(token);

  const signIn = (
    userData: UserData,
    setError: Dispatch<SetStateAction<boolean>>,
    history: History
  ) => {
    api
      .post("/sessions/", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.access);
        setAuth(response.data.access);
        history.push("/dashboard");
      })
      .catch((err) => setError(true));
  };

  return (
    <AuthContext.Provider value={{ token: auth, setAuth, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
