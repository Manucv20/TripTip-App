import { Outlet, useNavigate } from "react-router-dom";

function PrivateRoutes() {
  const navigate = useNavigate();

  return <Outlet />;
}

export default PrivateRoutes;
