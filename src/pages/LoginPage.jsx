import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { activateUserService, loginUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import IconoEmail from "../components/IconoEmail";
import IconoPassword from "../components/IconoPassword";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setLogin } = useContext(AuthContext);

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
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <h2>
        Login on <Link to="/">TripTip</Link>
      </h2>
      <form onSubmit={submitHandler} className="form">
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
          Have you forgotten your password? <Link>Reset password</Link>{" "}
        </p>
        <button>Log in</button>
        <Link to="/register">¿No tienes cuenta? Registrate.</Link>
      </form>
    </section>
  );
};

export default LoginPage;
