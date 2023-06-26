import { useState } from "react";
import { FaCheck, FaPencilAlt, FaTimes } from "react-icons/fa";
import { toast } from "sonner";

const UsernameComponent = ({ currentUsername, handleUsernameChange }) => {
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const handleEdit = () => {
    setNewUsername(currentUsername);
    setEditing(true);
  };

  const handleSave = () => {
    handleUsernameChange(newUsername);
    setEditing(false);
    toast.success("Necesitas actualizar para guardar los cambios");
  };

  const handleCancel = () => {
    setNewUsername(currentUsername);
    setEditing(false);
  };

  return (
    <>
      {" "}
      {editing ? (
        <>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Nuevo Username..."
          />

          <button
            type="button"
            onClick={handleSave}
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
            onClick={handleCancel}
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
          }}
        >
          {currentUsername}
          <FaPencilAlt
            className="fondo2"
            title="Modificar username"
            onClick={handleEdit}
            style={{
              cursor: "pointer",
            }}
          />
        </h3>
      )}
    </>
  );
};

export default UsernameComponent;
