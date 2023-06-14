import { createContext, useContext, useState } from "react";
import { GetUserProfileInfoApi, loginApi, signUpApi } from "../api/ApiService";
import ApiClient from "../api/ApiClient";

export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  login: (username: string, password: string) => Promise<boolean>;
  signUp: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  username: string;
  token: string | null;
  getUserId: () => void;
  userId: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  async function login(username: string, password: string): Promise<boolean> {
    try {
      const response = await loginApi(username, password);
      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;
        setIsAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        ApiClient.interceptors.request.use((config) => {
          console.log("intercepting and adding token");
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (err) {
      logout();
      return false;
    }
  }

  async function signUp(username: string, password: string): Promise<boolean> {
    try {
      const response = await signUpApi(username, password);
      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;
        setIsAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        ApiClient.interceptors.request.use((config) => {
          console.log("intercepting and adding token");
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (err) {
      logout();
      return false;
    }
  }

  function getUserId() {
    GetUserProfileInfoApi()
      .then((res) => setUserId(res.data.userId))
      .catch((err) => err);
  }

  function logout() {
    setIsAuthenticated(false);
    setUsername("");
    setToken(null);
  }

  const contextValue: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
    login,
    signUp,
    logout,
    username,
    token,
    getUserId,
    userId,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
