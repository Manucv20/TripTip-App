import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";

import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedAuth = localStorage.getItem("auth");
  const storedUsername = localStorage.getItem("username");
  const storedAvatar = localStorage.getItem("avatar");
  const storedFirstname = localStorage.getItem("firstname");

  const [token, setToken] = useState(storedToken || " ");
  const [userData, setUserData] = useState(null);
  const [auth, setAuth] = useState(storedAuth === "true");
  const [login, setLogin] = useState(false);
  const [avatar, setAvatar] = useState(storedAvatar || "");
  const [username, setUsername] = useState(storedUsername || "");
  const [firstname, setFirstname] = useState(storedFirstname || "");

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("auth", auth);
    localStorage.setItem("username", username);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("firstname", firstname);

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

    setFirstname(storedFirstname);
    setUsername(storedUsername);
    setAvatar(storedAvatar);
  }, [token, auth]);

  const logoutHandler = () => {
    localStorage.removeItem(storedToken);
    localStorage.removeItem(storedAuth);
    localStorage.removeItem(storedAvatar);
    localStorage.removeItem(storedUsername);
    localStorage.removeItem(storedFirstname);

    setAuth(false);
    setAvatar("");
    setUsername("");
    setFirstname("");
    return setToken(" ");
  };

  return (
    <AuthContext.Provider
      value={{
        firstname,
        setFirstname,
        username,
        setUsername,
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
