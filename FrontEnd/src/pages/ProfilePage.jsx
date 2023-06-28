import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { FaTimes, FaSyncAlt } from "react-icons/fa";

import { getDataUserService, updataUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import AvatarUploader from "../components/AvatarUploader ";
import UsernameComponent from "../components/UsernameComponent";
import EmailComponent from "../components/EmailComponent";
import PasswordComponent from "../components/PasswordComponent";

const ProfilePage = () => {
  const { userData, token, setToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [initialFormData, setInitialFormData] = useState({});

  const [imagen, setImagen] = useState(userData.imagen ?? "");

  const [currentUserName, setCurrentUserName] = useState(
    userData.userUsername ?? ""
  );

  const [currentEmail] = useState(userData.userEmail ?? "");

  const [currentPassword] = useState(formData.password ?? "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (userData.userId) {
          const data = await getDataUserService({ id: userData.userId, token });
          setFormData(data);
          setInitialFormData(data);
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

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data = new FormData(e.target);

      if (!imagen) {
        data.delete("profile_image");
      }

      const update = await updataUserService({
        data,
        token,
        id: userData.userId,
      });

      setToken(update);
      toast.success("Actualización exitosa.");

      setImagen("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageAction = (imagen) => {
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
                  handleAction={handleImageAction}
                  profile_imagen={userData.imagen}
                />
              </li>
              <li>
                <UsernameComponent
                  currentUsername={currentUserName || userData.userUsername}
                  handleUsernameChange={handleUsernameChange}
                />
              </li>
              <li>
                <EmailComponent
                  currentEmail={currentEmail || userData.userEmail}
                />
              </li>
              <li>
                <PasswordComponent currentPassword={currentPassword} />
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
              <FaSyncAlt
                style={{
                  color: "blue",
                }}
              />{" "}
              Actualizar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <FaTimes
                style={{
                  color: "red",
                }}
              />{" "}
              Cancelar
            </button>
          </fieldset>
        </form>
      </section>
    </>
  );
};

export default ProfilePage;
