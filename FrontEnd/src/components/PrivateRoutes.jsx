import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "./Sidebar";

function PrivateRoutes() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) return navigate("/register");
  }, []);

  return <>{auth ? (<div style={{display: "flex", gap: "1rem"}}>
    <Sidebar /> <Outlet />
    </div>) : null}</>;
}

export default PrivateRoutes;
