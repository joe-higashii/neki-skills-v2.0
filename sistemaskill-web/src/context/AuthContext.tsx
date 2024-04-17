import { ReactNode, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalItem, getSessionItem } from "@/services/storage";
import jwt_decode from "jwt-decode";
import { AuthContextType, Token } from "@/types/authTypes";

export const AuthContext = createContext<AuthContextType | null>(null);

export type AuthContextProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthContextProps) => {
  const navigate = useNavigate();
  function isAuthenticated(): unknown {
    const recoveredUser = getLocalItem("user") || getSessionItem("user");
    return recoveredUser;
  }

  function logout(): void {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate("/");
  }

  function getToken(): string | void {
    const storage = getLocalItem("user") || getSessionItem("user");
    if (storage != null) {
      return storage.token;
    }
  }
  function getUserId(): string | void {
    const token = getToken();
    if (token != null) {
      const decodedToken: Token = jwt_decode(token);
      return decodedToken.userId;
    }
  }
  function getUsername(): string | void {
    const token = getToken();
    if (token) {
      const decodedToken: Token = jwt_decode(token);
      const emailIndex = decodedToken.sub.indexOf("@");

      return decodedToken.sub.slice(0, emailIndex);
    }
  }
  function getUserLogin(): string | void {
    const token = getToken();
    if (token) {
      const decodedToken: Token = jwt_decode(token);
      return decodedToken.sub;
    }
  }

  return (
    <AuthContext.Provider
      value={
        {
          isAuthenticated,
          logout,
          getToken,
          getUserId,
          getUsername,
          getUserLogin,
        } as AuthContextType
      }
    >
      {children}
    </AuthContext.Provider>
  );
};
