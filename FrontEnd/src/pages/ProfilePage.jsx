import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  FaCheck,
  FaTimes,
  FaPencilAlt,
  FaSyncAlt,
  FaCameraRetro,
} from "react-icons/fa";

import {
  getDataUserService,
  sendDataUserService,
  sendUserEmailService,
  sendUserPasswordService,
} from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { userData, token, logoutHandler } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    usernameEditable: false, // Estado inicial de la edición del username
    emailEditable: false, // Estado inicial de la edición del correo electrónico
    passwordEditable: false, //Estado inicial de la edición del password
  });

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

  const [imagen, setImagen] = useState("");

  const imagenUrl = `${import.meta.env.VITE_APP_BACKEND}/uploads`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (userData?.userId) {
          const data = await getDataUserService({ id: userData.userId, token });
          setFormData(data);
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
        const currentImage = formData?.profile_image;
        if (currentImage) {
          data.append("profile_image", currentImage);
        } else {
          data.delete("profile_image"); // Eliminar el campo "profile_image" del FormData si no hay cambios
        }
      }

      await sendDataUserService({
        data,
        token,
        id: userData?.userId,
      });
      toast.success("Actualización exitosa.");
      setImagen("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUserName = () => {
    setFormData((prevData) => ({
      ...prevData,
      usernameEditable: false,
      username: prevData.username,
    }));
    toast.success("Necesitas actualizar para guardar los cambios");
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

  const handleCancelUsername = () => {
    setFormData((prevData) => ({
      ...prevData,
      username: currentUserName,
      usernameEditable: false,
    }));
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

  const handleEditUsername = () => {
    setFormData({
      ...formData,
      usernameEditable: true,
      username: "",
    });
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
    formData.usernameEditable,
    formData.username,
    formData.passwordEditable,
    formData.password,
  ]);

  return (
    <>
      <section>
        {loading ? <p>Cargando Formulario...</p> : null}
        <form className="setting" onSubmit={handleForm}>
          <fieldset>
            <figcaption
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <h2>Perfil de usuario</h2>{" "}
            </figcaption>

            <ul>
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <label
                  htmlFor="fileInput"
                  style={{
                    width: "170px",
                    height: "170px",
                    display: "inline-block",
                    backgroundImage: formData.profile_image
                      ? `url(${`${imagenUrl}/${formData?.profile_image}`})`
                      : 'url("/photoperfil.png")',
                    backgroundSize: "cover",
                    borderRadius: "50%",
                    position: "relative",
                  }}
                >
                  {imagen ? (
                    <>
                      <img
                        src={URL.createObjectURL(imagen)}
                        alt="Mi Perfil"
                        style={{
                          width: "170px",
                          height: "170px",
                          display: "inline-block",
                          backgroundSize: "cover",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                      />
                    </>
                  ) : null}
                  <FaCameraRetro
                    className="fondo"
                    title="Descargar Avatar"
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "30px",
                      color: "white",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                  />
                </label>

                <input
                  id="fileInput"
                  type="file"
                  name="profile_image"
                  onChange={(e) => setImagen(e.target.files[0])}
                  accept=".jpg, .png"
                  style={{ display: "none" }}
                />
              </li>
              {imagen ? (
                <li>Tienes que Actualizar para guardar los cambios.</li>
              ) : null}
              <li>
                {formData.usernameEditable ? (
                  <>
                    <input
                      type="text"
                      name="username"
                      value={formData?.username ?? ""}
                      onChange={handleChange}
                      placeholder="Nuevo Username..."
                    />

                    <button
                      type="button"
                      onClick={handleSaveUserName}
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
                      onClick={handleCancelUsername}
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
                    onClick={handleEditUsername}
                  >
                    {formData?.username ?? ""}
                    <FaPencilAlt className="fondo2" />
                  </h3>
                )}

                <input
                  type="hidden"
                  name="username"
                  value={formData?.username ?? ""}
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
          <fieldset>
            <figcaption
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <h2>Datos Personales</h2>{" "}
            </figcaption>
            <ul>
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