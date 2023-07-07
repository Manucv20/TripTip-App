import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { FaTimes, FaSyncAlt } from "react-icons/fa";

import { getDataUserService, updataUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import AvatarUploader from "../components/user/AvatarUploader ";
import UsernameComponent from "../components/user/UsernameComponent";
import EmailComponent from "../components/user/EmailComponent";
import PasswordComponent from "../components/user/PasswordComponent";
import TokenButton from "../components/tokenButton";


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
      <section
        style={{
          width: "100%",
        }}
      >
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "2rem",
            marginBottom: "5rem",
          }}
          onSubmit={handleForm}
        >
          {loading ? <p>Cargando Formulario...</p> : null}
          <fieldset
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "370px",
              height: "500px",
              gap: "1rem",
              padding: "2rem",
              margin: "0.5rem",
              borderRadius: "15px",
              boxShadow: "0 0px 3px rgba(0, 0, 0, 0.5)",
            }}
          >
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "600px",
                lineHeight: "1.5715",
                color: "#000000",
                textAlign: "center",
              }}
            >
              Perfil de usuario
            </h2>

            <ul>
              <li className="input-perfil">
                <AvatarUploader
                  handleAction={handleImageAction}
                  profile_imagen={userData.imagen}
                />
              </li>
              <li className="input-oculto">
                <UsernameComponent
                  currentUsername={currentUserName || userData.userUsername}
                  handleUsernameChange={handleUsernameChange}
                />
              </li>
              <li className="input-oculto">
                <EmailComponent
                  currentEmail={currentEmail || userData.userEmail}
                />
              </li>
              <li className="input-oculto">
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
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "370px",
              height: "500px",
              gap: "1rem",
              padding: "2rem",
              margin: "0.5rem",
              borderRadius: "15px",
              boxShadow: "0 0px 3px rgba(0, 0, 0, 0.5)",
            }}
          >
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "600px",
                lineHeight: "1.5715",
                color: "#000000",
                textAlign: "center",
              }}
            >
              Datos personales
            </h2>
            <ul>
              <li className="container-personal">
                <label className="label-perfil" htmlFor="firstname">
                  Nombre
                </label>
                <input
                  className="input-personal"
                  id="firstname"
                  type="text"
                  name="name"
                  value={formData?.name ?? ""}
                  onChange={handleChange}
                  placeholder="Nombre..."
                  required
                />
              </li>
              <li className="container-personal">
                <label htmlFor="lastname" className="label-perfil">
                  Apellido
                </label>
                <input
                  className="input-personal"
                  id="lastname"
                  type="text"
                  name="lastname"
                  value={formData?.lastname ?? ""}
                  onChange={handleChange}
                  placeholder="Apellido..."
                  required
                />
              </li>
              <li className="container-personal">
                <label htmlFor="gender" className="label-perfil">
                  Género
                </label>
                <select
                  className="input-personal"
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
              <li className="container-personal">
                <label htmlFor="address" className="label-perfil">
                  Dirección
                </label>
                <input
                  className="input-personal"
                  id="address"
                  type="text"
                  name="address"
                  value={formData?.address ?? ""}
                  placeholder="Dirección..."
                  onChange={handleChange}
                />
              </li>
              <li className="container-personal">
                <label htmlFor="biografia" className="label-perfil">
                  Sobre mí
                </label>

                <textarea
                  className="textarea-personal"
                  id="biografia"
                  name="bio"
                  value={formData?.bio ?? ""}
                  placeholder="Cuentame sobre ti..."
                  onChange={handleChange}
                />
              </li>
              <li className="input-register">
                <button
                  className="boton-personal"
                  type="submit"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#D93030",
                    marginRight: "3rem",
                    gap: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginTop: "20px",
                  }}
                >
                  {" "}
                  <FaSyncAlt
                    style={{
                      color: "white",
                    }}
                  />{" "}
                  Actualizar
                </button>
                <button
                  className="boton-personal"
                  type="button"
                  onClick={handleCancel}
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    backgroundColor: "#D93030",
                    fontWeight: "bold",
                  }}
                >
                  <FaTimes
                    style={{
                      color: "white",
                    }}
                  />{" "}
                  Cancelar
                </button>
                <TokenButton />
              </li>
            </ul>
          </fieldset>
        </form>
      </section>
    </>
  );
};

export default ProfilePage;
