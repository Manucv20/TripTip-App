import { useContext, useState } from "react";
import { FaCheck, FaPencilAlt, FaTimes } from "react-icons/fa";
import { toast } from "sonner";
import { updataUserEmailService } from "../services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const EmailComponent = ({ currentEmail }) => {
  const navigate = useNavigate();
  const { token, logoutHandler, userData } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const handleEdit = () => {
    setNewEmail(currentEmail);
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      if (!newEmail) {
        toast.error("El campo email no se puede quedar vacio.");
        return;
      }

      await updataUserEmailService({
        email: newEmail,
        token,
        id: userData.userId,
      });
      toast.success("Actualización exitosa.");

      logoutHandler();
      navigate("/registered");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    setNewEmail(currentEmail);
    setEditing(false);
  };

  return (
    <>
      {editing ? (
        <>
          <input
            type="email"
            name="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Nuevo Email..."
          />

          <button
            type="button"
            onClick={handleSave}
            style={{
              cursor: "pointer",
            }}
          >
            <FaCheck
              title="Aceptar"
              style={{
                color: "green",
              }}
            />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              cursor: "pointer",
            }}
          >
            <FaTimes
              title="Cancelar"
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
          }}
        >
          {currentEmail}
          <FaPencilAlt
            className="fondo2"
            title="Modificar Email"
            onClick={handleEdit}
            style={{
              cursor: "pointer",
            }}
          />
        </h3>
      )}
      <input type="hidden" name="email" value={currentEmail} readOnly />
    </>
  );
};

export default EmailComponent;
