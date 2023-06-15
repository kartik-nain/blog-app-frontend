import { createContext, useContext, useState } from "react";
import { GetUserProfileInfoApi, loginApi, signUpApi } from "../api/ApiService";

export interface AuthContextType {
  login: (username: string, password: string) => Promise<boolean>;
  signUp: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
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
  const [userId, setUserId] = useState<string | null>(null);

  async function login(username: string, password: string): Promise<boolean> {
    try {
      const response = await loginApi(username, password);
      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;

        localStorage.setItem("token", jwtToken);

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

        localStorage.setItem("token", jwtToken);

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
    localStorage.removeItem("token");
  }

  const contextValue: AuthContextType = {
    login,
    signUp,
    logout,
    getUserId,
    userId,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
