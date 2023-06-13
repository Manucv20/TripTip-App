import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserService } from "../services";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUserService({ email, password });

      navigate("/userprivate");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleForm}>
        <ul>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="pass1">Password</label>
            <input
              type="password"
              id="pass1"
              name="pass1"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
        </ul>
        <button>Inicia Sesión</button>
        {error ? <p>{error}</p> : null}
      </form>
      <Link to="/register">¿No tienes cuenta? Registrate.</Link>
    </section>
  );
};

export default LoginPage;
