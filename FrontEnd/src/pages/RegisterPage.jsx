import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaUserPlus } from "react-icons/fa";

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
        `The "passwords" you entered do not match. Please make sure to enter the same password in both fields.`
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
    <section style={{ margin: "2rem" }}>
      <form onSubmit={handleForm} style={{ margin: "2rem" }}>
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
            Register on <Link to="/">TripTip</Link>
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
                placeholder="User ..."
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
                placeholder="Mail address ..."
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
                placeholder="Repeat password ..."
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

          <Link to="/login">¿Tienes ya cuenta con nosotros? Logeate</Link>
        </fieldset>
      </form>
    </section>
  );
};

export default RegisterPage;
