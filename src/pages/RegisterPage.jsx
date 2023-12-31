import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaUserPlus } from "react-icons/fa";

import { registerUserService } from "../services";
import IconoUserRegister from "../components/icons/IconoUserRegister";
import IconoEmail from "../components/icons/IconoEmail";
import IconoPassword from "../components/icons/IconoPassword";

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
        `The "passwords" you entered do not match. Please make sure to enter the same password in both fields.`
      );
      return;
    }

    try {
      await registerUserService({
        username,
        email,
        password: pass1,
      });

      navigate(`/registered/`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="login-page">
      <div className="background">
        <video
          className="video-background"
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: "-1",
            filter: "blur(5px)",
          }}
        >
          <source src="/video_login.mp4" type="video/mp4" />
        </video>
        <form
          style={{
            gap: "120px",
            margin: "2rem",
          }}
          onSubmit={handleForm}
        >
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "600px",
              lineHeight: "1.5715",
              textAlign: "center",
            }}
          >
            Regístrate en <Link to="/">TripTip</Link>
          </h2>
          <ul>
            <li className="input-register">
              <IconoUserRegister />
              <input
                className="input-reg"
                type="text"
                id="username"
                name="username"
                required
                placeholder="Nombre de usuario"
                onChange={(e) => setUsername(e.target.value)}
              />
            </li>
            <li className="input-register">
              <IconoEmail />
              <input
                className="input-reg"
                type="email"
                id="email"
                name="email"
                required
                placeholder="Correo electrónico "
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
                placeholder="Contraseña"
                onChange={(e) => setPass1(e.target.value)}
              />
            </li>
            <li className="input-register">
              <IconoPassword />
              <input
                className="input-reg"
                type="password"
                id="pass2"
                name="pass2"
                required
                placeholder="Repetir contraseña"
                onChange={(e) => setPass2(e.target.value)}
              />
            </li>
            <li className="input-register">
              <button className="boton-reg">
                <span>Registro</span>
                <FaUserPlus />
              </button>
            </li>
          </ul>
          <div className="alta-login">
            <p>¿Tienes ya cuenta con nosotros?</p>
            <Link style={{ textAlign: "center" }} to="/login">
              <p className="anchor">Inicia sesión</p>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
