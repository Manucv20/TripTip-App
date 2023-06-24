import { useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import Avatar from "./Avatar";

const AvatarUploader = ({ handleImageChange, profile_imagen }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    handleImageChange(file);
  };

  return (
    <>
      <label htmlFor="fileInput">
        <FaCameraRetro
          className="fondo2"
          title="Descargar Avatar"
          style={{
            position: "absolute",
            margin: "10px",
            bottom: "-10px",
            right: "0px",
            color: "#adadadad",
            fontSize: "24px",
            cursor: "pointer",
          }}
        />
      </label>
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Mi Perfil"
          style={{
            width: "170px",
            height: "170px",
            display: "inline-block",
            backgroundSize: "cover",
            borderRadius: "50%",
            position: "relative",
          }}
        />
      ) : (
        <Avatar imagen={profile_imagen} />
      )}
      <input
        id="fileInput"
        type="file"
        name="profile_image"
        onChange={handleImageUpload}
        accept=".jpg, .png"
        style={{ display: "none" }}
      />
    </>
  );
};

export default AvatarUploader;
