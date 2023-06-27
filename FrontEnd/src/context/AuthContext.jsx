import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
<<<<<<< HEAD
=======

>>>>>>> origin/dev
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedAuth = localStorage.getItem("auth");
<<<<<<< HEAD
=======
  const storedUsername = localStorage.getItem("username");
  const storedAvatar = localStorage.getItem("avatar");
  const storedFirstname = localStorage.getItem("firstname");

>>>>>>> origin/dev
  const [token, setToken] = useState(storedToken || " ");
  const [userData, setUserData] = useState(null);
  const [auth, setAuth] = useState(storedAuth === "true");
  const [login, setLogin] = useState(false);
<<<<<<< HEAD
=======
  const [avatar, setAvatar] = useState(storedAvatar || "");
  const [username, setUsername] = useState(storedUsername || "");
  const [firstname, setFirstname] = useState(storedFirstname || "");
>>>>>>> origin/dev

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("auth", auth);
<<<<<<< HEAD
=======
    localStorage.setItem("username", username);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("firstname", firstname);
>>>>>>> origin/dev

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
<<<<<<< HEAD
=======

    setFirstname(storedFirstname);
    setUsername(storedUsername);
    setAvatar(storedAvatar);
>>>>>>> origin/dev
  }, [token, auth]);

  const logoutHandler = () => {
    localStorage.removeItem(storedToken);
<<<<<<< HEAD
    localStorage.removeItem("auth");
    setAuth(false);
=======
    localStorage.removeItem(storedAuth);
    localStorage.removeItem(storedAvatar);
    localStorage.removeItem(storedUsername);
    localStorage.removeItem(storedFirstname);

    setAuth(false);
    setAvatar("");
    setUsername("");
    setFirstname("");
>>>>>>> origin/dev
    return setToken(" ");
  };

  return (
    <AuthContext.Provider
      value={{
<<<<<<< HEAD
=======
        firstname,
        setFirstname,
        username,
        setUsername,
        avatar,
        setAvatar,
>>>>>>> origin/dev
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
