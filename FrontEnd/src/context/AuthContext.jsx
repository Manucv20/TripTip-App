import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";

import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedAuth = localStorage.getItem("auth");

  const [token, setToken] = useState(storedToken || " ");
  const [userData, setUserData] = useState(null);
  const [auth, setAuth] = useState(storedAuth === "true");
  const [login, setLogin] = useState(false);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("auth", auth);

    if (token !== " ") {
      try {
        const decodedToken = jwtDecode(token);
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

    setAvatar("");
  }, [token, auth]);

  const logoutHandler = () => {
    localStorage.removeItem(storedToken);
    localStorage.removeItem("auth");

    setAuth(false);
    return setToken(" ");
  };

  return (
    <AuthContext.Provider
      value={{
        avatar,
        setAvatar,
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
