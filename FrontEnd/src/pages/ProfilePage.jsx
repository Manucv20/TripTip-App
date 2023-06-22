import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { getDataUserService, sendDataUserService } from "../services";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { userData, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
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

      setImagen("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModifyPassword = () => {
    // Aquí puedes implementar la lógica para abrir el formulario de modificación de contraseña
    console.log("Modificar contraseña");
  };

  const handleModifyEmail = () => {
    // Aquí puedes implementar la lógica para abrir el formulario de modificación de contraseña
    console.log("Modificar correo electronico");
  };

  return (
    <>
      <section>
        {loading ? <p>Cargando Formulario...</p> : null}
        <form className="setting" onSubmit={handleForm}>
          <fieldset>
            <figcaption>Perfil de usuario:</figcaption>
            <ul>
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <label
                  className="fondo"
                  htmlFor="fileInput"
                  title="Descargar Avatar"
                  style={{
                    width: "170px",
                    height: "170px",
                    display: "inline-block",
                    backgroundImage: formData.profile_image
                      ? `url(${`${imagenUrl}/${formData?.profile_image}`})`
                      : 'url("/photoperfil.png")',
                    backgroundSize: "cover",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  {imagen ? (
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
                  ) : null}
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
              <li>
                {
                  <h3
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                      textAlign: "left",
                    }}
                  >
                    {formData?.username ?? ""}
                  </h3>
                }
                <input
                  type="hidden"
                  name="username"
                  value={formData?.username ?? ""}
                  readOnly
                />
              </li>
              <li>
                <label htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData?.email ?? ""}
                  onChange={handleChange}
                  readOnly
                />
                <button type="button" onClick={handleModifyEmail}>
                  Modificar
                </button>
              </li>

              <li>
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData?.password ?? ""}
                  onChange={handleChange}
                  readOnly
                />
                <button type="button" onClick={handleModifyPassword}>
                  Modificar
                </button>
              </li>
            </ul>
          </fieldset>
          <fieldset>
            <figcaption>Datos Personales:</figcaption>
            <ul>
              <li>
                <label htmlFor="firstname">Nombre</label>
                <input
                  id="firstname"
                  type="text"
                  name="name"
                  value={formData?.name ?? ""}
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </li>
              <li>
                <label htmlFor="biografia">Sobre mi</label>

                <textarea
                  id="biografia"
                  name="bio"
                  value={formData?.bio ?? ""}
                  onChange={handleChange}
                />
              </li>
            </ul>
            <button type="submit">Actualizar</button>
          </fieldset>
        </form>
      </section>
    </>
  );
};

export default ProfilePage;
