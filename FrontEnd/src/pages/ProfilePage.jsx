import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { FaCheck, FaTimes, FaPencilAlt, FaSyncAlt } from "react-icons/fa";

import {
  getDataUserService,
  sendDataUserService,
  sendUserEmailService,
  sendUserPasswordService,
} from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AvatarUploader from "../components/AvatarUploader ";
import UsernameComponent from "../components/UsernameComponent";

const ProfilePage = () => {
  const navigate = useNavigate();

  const {
    userData,
    token,
    logoutHandler,
    setAvatar,
    setUsername,
    setFirstname,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailEditable: false, // Estado inicial de la edición del correo electrónico
    passwordEditable: false, //Estado inicial de la edición del password
  });
  const [imagen, setImagen] = useState("");

  //Gestion del username
  const [currentUserName, setCurrentUserName] = useState(
    formData?.username ?? ""
  );

  //Gestion del email
  const [currentEmail, setCurrentEmail] = useState(formData?.email ?? "");

  //Gestion del password
  const [currentPassword, setCurrenPasswod] = useState(
    formData?.password ?? ""
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (userData?.userId) {
          const data = await getDataUserService({ id: userData.userId, token });
          setFormData(data);
          localStorage.setItem("avatar", data.profile_image);
          setAvatar(localStorage.getItem("avatar") ?? "");
          localStorage.setItem("username", data.username);
          setUsername(localStorage.getItem("username") ?? "");
          localStorage.setItem("firstname", data.name);
          setFirstname(localStorage.getItem("firstname") ?? "");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData, token, imagen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data = new FormData(e.target);

      if (!imagen) {
        data.delete("profile_image");
      }

      await sendDataUserService({
        data,
        token,
        id: userData?.userId,
      });
      toast.success("Actualización exitosa.");

      setUsername(currentUserName);
      setFirstname(formData.name);
      setImagen("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEmail = async () => {
    try {
      setLoading(true);
      setFormData((prevData) => ({
        ...prevData,
        emailEditable: false,
        email: prevData.email,
      }));

      const email = formData?.email;

      if (!email) {
        throw new Error("El campo email está vacio.");
      }

      await sendUserEmailService({
        email,
        token,
        id: formData?.id,
      });
      toast.success("Actualización exitosa.");

      logoutHandler();
      navigate("/registered");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async () => {
    try {
      setLoading(true);
      setFormData((prevData) => ({
        ...prevData,
        passwordEditable: false,
        password: currentPassword,
      }));
      const password = formData?.password;

      if (!password) {
        throw new Error("El campo password está vacio.");
      }
      await sendUserPasswordService({
        password,
        token,
        id: formData?.id,
      });
      toast.success("Actualización exitosa.");

      logoutHandler();
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEmail = () => {
    setFormData((prevData) => ({
      ...prevData,
      email: currentEmail,
      emailEditable: false,
    }));
  };

  const handleCancelPassword = () => {
    setFormData((prevData) => ({
      ...prevData,
      password: currentPassword,
      passwordEditable: false,
    }));
  };

  const handleEditEmail = () => {
    setFormData({
      ...formData,
      emailEditable: true,
      email: "",
    });
  };

  const handleEditPassword = () => {
    setFormData({
      ...formData,
      passwordEditable: true,
      password: "",
    });
  };

  useEffect(() => {
    if (!formData.emailEditable) {
      setCurrentEmail(formData?.email ?? "");
    }
    if (!formData.usernameEditable) {
      setCurrentUserName(formData?.username ?? "");
    }
    if (!formData.passwordEditable) {
      setCurrenPasswod(formData?.password ?? "");
    }
  }, [
    formData.emailEditable,
    formData.email,
    formData.username,
    formData.passwordEditable,
    formData.password,
  ]);

  const handleImageChange = (imagen) => {
    setImagen(imagen);
  };

  const handleUsernameChange = (currentUserName) => {
    setCurrentUserName(currentUserName);
  };

  return (
    <>
      <section>
        {loading ? <p>Cargando Formulario...</p> : null}
        <form className="setting" onSubmit={handleForm}>
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
            }}
          >
            <figcaption
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h2>Perfil de usuario</h2>
            </figcaption>
            <ul
              style={{
                display: "flex",
                gap: "2rem",
              }}
            >
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <AvatarUploader
                  handleImageChange={handleImageChange}
                  profile_imagen={formData.profile_image}
                />
              </li>
              {imagen ? (
                <li>
                  <h5>Tienes que Actualizar para guardar los cambios.</h5>
                </li>
              ) : null}
              <li>
                <UsernameComponent
                  currentUsername={currentUserName}
                  handleUsernameChange={handleUsernameChange}
                />
                <input
                  type="hidden"
                  name="username"
                  value={currentUserName}
                  readOnly
                />
              </li>
              <li>
                {formData.emailEditable ? (
                  <>
                    <input
                      type="email"
                      name="email"
                      value={formData?.email ?? ""}
                      onChange={handleChange}
                      placeholder="Nuevo Email..."
                    />

                    <button
                      type="button"
                      onClick={handleSaveEmail}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <FaCheck
                        style={{
                          color: "green",
                        }}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEmail}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <FaTimes
                        style={{
                          color: "red",
                        }}
                      />
                    </button>
                  </>
                ) : (
                  <h3
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                      marginTop: "10px",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                    onClick={handleEditEmail}
                  >
                    {formData?.email ?? ""}
                    <FaPencilAlt className="fondo2" />
                  </h3>
                )}
                <input
                  type="hidden"
                  name="email"
                  value={formData?.email ?? ""}
                  readOnly
                />
              </li>
              <li>
                {formData.passwordEditable ? (
                  <>
                    <input
                      type="password"
                      name="password"
                      value={formData?.password ?? ""}
                      onChange={handleChange}
                      placeholder="Nuevo Password..."
                    />

                    <button
                      type="button"
                      onClick={handleSavePassword}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <FaCheck
                        style={{
                          color: "green",
                        }}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelPassword}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <FaTimes
                        style={{
                          color: "red",
                        }}
                      />
                    </button>
                  </>
                ) : (
                  <h3
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                      marginTop: "10px",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                    onClick={handleEditPassword}
                  >
                    Password ********
                    <FaPencilAlt className="fondo2" />
                  </h3>
                )}

                <input
                  type="hidden"
                  name="password"
                  value={formData?.password ?? ""}
                  readOnly
                />
              </li>
            </ul>
          </fieldset>
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
            }}
          >
            <figcaption
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <h2>Datos Personales</h2>{" "}
            </figcaption>
            <ul
              style={{
                display: "flex",
                gap: "2rem",
              }}
            >
              <li>
                <label htmlFor="firstname">Nombre</label>
                <input
                  id="firstname"
                  type="text"
                  name="name"
                  value={formData?.name ?? ""}
                  onChange={handleChange}
                  placeholder="Nombre..."
                  required
                />
              </li>
              <li>
                <label htmlFor="lastname">Apellido</label>
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  value={formData?.lastname ?? ""}
                  onChange={handleChange}
                  placeholder="Apellido..."
                  required
                />
              </li>
              <li>
                <label htmlFor="gender">Género</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData?.gender ?? ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                </select>
              </li>
              <li>
                <label htmlFor="address">Dirección</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData?.address ?? ""}
                  placeholder="Dirección..."
                  onChange={handleChange}
                />
              </li>
              <li>
                <label htmlFor="biografia">Sobre mi</label>

                <textarea
                  id="biografia"
                  name="bio"
                  value={formData?.bio ?? ""}
                  placeholder="Cuentame sobre ti..."
                  onChange={handleChange}
                />
              </li>
            </ul>
            <button
              type="submit"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              {" "}
              <FaSyncAlt /> Actualizar
            </button>
          </fieldset>
        </form>
      </section>
    </>
  );
};

export default ProfilePage;
