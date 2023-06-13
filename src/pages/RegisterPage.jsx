import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUserService } from "../services";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    if (pass1 !== pass2) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUserService({ username, email, password: pass1 });

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={handleForm}>
        <ul>
          <li>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
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
              onChange={(e) => setPass1(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="pass2">Repeat Password</label>
            <input
              type="password"
              id="pass2"
              name="pass2"
              required
              onChange={(e) => setPass2(e.target.value)}
            />
          </li>
        </ul>
        <button>Register</button>
        {error ? <p>{error}</p> : null}
      </form>
      <Link to="/">Back Home</Link>
    </section>
  );
};

export default RegisterPage;
