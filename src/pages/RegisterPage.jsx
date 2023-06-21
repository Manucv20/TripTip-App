import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { registerUserService } from "../services";
import IconoUserRegister from "../components/IconoUserRegister";
import IconoEmail from "../components/IconoEmail";
import IconoPassword from "../components/IconoPassword";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    if (pass1 !== pass2) {
      toast.error(
        `Las contraseñas que ingresaste no coinciden. Asegúrate de escribir la misma contraseña en ambos campos.`
      );
      return;
    }

    try {
      await registerUserService({ username, email, password: pass1 });

      navigate("/registered");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <h2>
        Registrate en <Link to="/">TripTip</Link>
      </h2>
      <form onSubmit={handleForm} className="form">
        <ul className="input">
          <li className="input-wrapper">
            <IconoUserRegister />
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Nombre de Usuario ..."
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li className="input-wrapper">
            <IconoEmail />
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Correo electrónico ..."
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
              placeholder="Contraseña ..."
              onChange={(e) => setPass1(e.target.value)}
            />
          </li>
          <li className="input-wrapper">
            <IconoPassword />
            <input
              type="password"
              id="pass2"
              name="pass2"
              required
              placeholder="Repita la contraseña ..."
              onChange={(e) => setPass2(e.target.value)}
            />
          </li>
        </ul>
        <button>Registrate</button>
        <p>
          ¿Ya estás registrado?
          <Link to="/login"> Haga clic Aquí</Link>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;
