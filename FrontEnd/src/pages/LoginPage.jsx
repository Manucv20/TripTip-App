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

      if (data) return navigate("/");
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
      if (response) return navigate("/account/myprofile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem",
      }}
    >
      <form onSubmit={submitHandler} style={{ margin: "2rem" }}>
        <fieldset
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "2rem",
            padding: "1.7rem",
            margin: "0.5rem",
            borderRadius: "15px",
            boxShadow: "0 0px 3px rgba(0, 0, 0, 0.5)",
            backgroundColor: "#C2B280",
          }}
        >
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "600px",
              lineHeight: "1.5715",
              color: "#000000",
            }}
          >
            Login on <Link to="/">TripTip</Link>
          </h2>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <li className="input-register">
              <IconoEmail />
              <input
                className="input-reg"
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email ..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </li>
            <li className="input-register">
              <IconoPassword />
              <input
                className="input-reg"
                type="password"
                id="pass1"
                name="pass1"
                required
                placeholder="Password ..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
            <li className="input-register">
              <button className="boton-reg">
                <span>Iniciar sesión</span>
                <FaSignInAlt />
              </button>
            </li>
          </ul>

          <Link to="/register">¿No tienes cuenta? Registrate.</Link>
        </fieldset>
      </form>
    </section>
  );
};

export default LoginPage;
