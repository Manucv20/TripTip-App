import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { FaSignInAlt } from "react-icons/fa";

import { activateUserService, loginUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import IconoEmail from "../components/IconoEmail";
import IconoPassword from "../components/IconoPassword";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setLogin, setAuth } = useContext(AuthContext);

  const { token } = useParams();
  const [activated, setActivated] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    if (token && !activated) {
      activateAccount(token);
    }
  }, [token, activated, initialLoad]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUserService({ email, password });
      setToken(data);
      setLogin(true);
      setAuth(true);

      if (data) return navigate("/myprofile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const activateAccount = async (token) => {
    try {
      const response = await activateUserService({ token });

      if (response.message === "Account activated successfully") {
        toast.success("Account activated successfully");
        setActivated(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form onSubmit={submitHandler} className="form">
        <fieldset
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "1rem",
            padding: "3rem",
            margin: "0.5rem",
            borderRadius: "15px",
            boxShadow: "0 0px 3px rgba(0, 0, 0, 0.5)",
            backgroundColor: "#C2B280",
          }}
        >
          <h2>
            Login on <Link to="/">TripTip</Link>
          </h2>
          <ul className="input">
            <li className="input-wrapper">
              <IconoEmail />
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email ..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </li>
            <li className="input-wrapper">
              <IconoPassword />
              <input
                type="password"
                id="pass1"
                name="pass1"
                required
                placeholder="Password ..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
          </ul>
          <p>
            ¿Has Olvidado tu Contraseña? <Link>Reset password</Link>{" "}
          </p>
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",

              margin: "1rem",
            }}
          >
            <span>Iniciar sesión</span>
            <FaSignInAlt />
          </button>
          <Link to="/register">¿No tienes cuenta? Registrate.</Link>
        </fieldset>
      </form>
    </section>
  );
};

export default LoginPage;
