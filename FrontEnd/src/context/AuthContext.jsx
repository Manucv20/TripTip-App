import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedAuth = localStorage.getItem("auth");
  const storedUserData = localStorage.getItem("userData");
  
  const [token, setToken] = useState(storedToken || " ");
  const [userData, setUserData] = useState(
    storedUserData ? JSON.parse(storedUserData) : null
  );
  const [auth, setAuth] = useState(storedAuth === "true");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("auth", auth);

    if (token !== " ") {
      try {
        const decodedToken = jwtDecode(token);
        localStorage.setItem("userData", JSON.stringify(decodedToken)); // Guardar userData como cadena JSON
        setUserData(decodedToken);
        setAuth(true);
        if (login) {
          toast.success(
            `Bienvenid@ ${decodedToken.firstName || decodedToken.userUsername}`
          );
          setLogin(false);
        }
      } catch (error) {
        toast.error("Error decoding token:", error);
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  }, [token, auth]);

    const logoutHandler = () => {
    localStorage.removeItem(storedToken);
    localStorage.removeItem("auth");
    localStorage.removeItem("userData");
    
    setUserData(null);
    setAuth(false);
    return setToken(" ");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userData,
        auth,
        setAuth,
        setLogin,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
