import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { FaSignInAlt } from "react-icons/fa";

import { activateUserService, loginUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import IconoEmail from "../components/icons/IconoEmail";
import IconoPassword from "../components/icons/IconoPassword";

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
    <section className="login-page">
      <video
        autoPlay
        loop
        muted
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: "-1",
        }}
      >
        <source src="/video_login.mp4" type="video/mp4" />
      </video>
      <form onSubmit={submitHandler}>
        <fieldset
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",

            padding: "1.7rem",
            margin: "0.5rem",
            borderRadius: "15px",
            // boxShadow: "0 0px 3px rgba(0, 0, 0, 0.5)",
            backgroundColor: "#dcdcdccf",
          }}
        >
          <h2
            style={{
              color: "rgb(194, 178, 128)",
              fontSize: "1.75rem",
              fontWeight: "600px",
              lineHeight: "1.5715",
              textAlign: "center",
            }}
          >
            Inicia sesión en <Link to="/">Triptip</Link>
          </h2>
          <ul>
            <li className="input-register">
              <IconoEmail />
              <input
                className="input-reg"
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email"
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
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
            <li className="input-register">
              <button className="boton-reg">
                <span>Iniciar sesión</span>
              </button>
            </li>
          </ul>
          <div className="alta-login">
            <p>¿No tienes cuenta?</p>
            <Link style={{ textAlign: "center" }} to="/register">
              {" "}
              <p className="anchor">Regístrate.</p>
            </Link>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default LoginPage;
