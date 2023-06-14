import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PrivateRoutes() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) return navigate("/login");
  }, []);

  return <>{auth ? <Outlet /> : null}</>;
}

export default PrivateRoutes;
