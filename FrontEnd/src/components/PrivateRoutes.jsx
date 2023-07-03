import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "./Sidebar";

function PrivateRoutes() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) return navigate("/login");
  }, []);

  return (
    <>
      {auth ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            height: "100vh",
          }}
        >
          {<Sidebar />} <Outlet />
        </div>
      ) : null}
    </>
  );
}

export default PrivateRoutes;
