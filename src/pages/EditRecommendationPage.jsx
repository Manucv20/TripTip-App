import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  getRecommendationById,
  editRecommendation,
} from "../services/getRecommendationsById";

const EditRecommendationPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { recommendationId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    summary: "",
    details: "",
    image: null,
  });

const [formErrors, setFormErrors] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [recommendationImageURL, setRecommendationImageURL] = useState("");
  const [existingImageName, setExistingImageName] = useState("");
  const defaultImageURL = "/Subir_foto_recomendacion.jpg";

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await getRecommendationById(recommendationId);
        if (
          response &&
          response.recommendation &&
          response.recommendation.result
        ) {
          const { result } = response.recommendation;
          setFormData((prevFormData) => ({
            ...prevFormData,
            title: result.title,
            category: result.category,
            location: result.location,
            summary: result.summary,
            details: result.details,
          }));
          setDataLoaded(true);
          setExistingImageName(result.image);
          setRecommendationImageURL(
            result.image
              ? `${import.meta.env.VITE_APP_BACKEND}/uploads/${result.image}`
              : defaultImageURL
          );
        } else {
          console.error(
            "No se encontró el resultado en la respuesta:",
            response && response.recommendation
          );
        }
      } catch (error) {
        console.error("Error al obtener la recomendación:", error);
      }
    };

    if (recommendationId) {
      fetchRecommendation();
    }
  }, [recommendationId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: null,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: file,
      }));
      setRecommendationImageURL(URL.createObjectURL(file));
    }
  };

  const handleUpdateRecommendation = async () => {
    try {
      if (!token) {
        console.log("Error: No se encontró un token");
        return;
      }

      const updatedRecommendationData = { ...formData };

      if (!updatedRecommendationData.image) {
        if (existingImageName) {
          const existingImageResponse = await axios.get(
            `${import.meta.env.VITE_APP_BACKEND}/uploads/${existingImageName}`,
            {
              responseType: "blob",
            }
          );

          const file = new File(
            [existingImageResponse.data],
            existingImageName
          );
          updatedRecommendationData.image = file;
        } else {
          updatedRecommendationData.image = null;
        }
      }

      await editRecommendation(
        recommendationId,
        updatedRecommendationData,
        token
      );

      console.log("Recomendación actualizada");
      navigate("/myRecommendations");
    } catch (error) {
      console.log("Error al actualizar la recomendación:", error);
      alert(
        "Error al actualizar la recomendación. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateRecommendation();
  };

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#f1f1f1",
          height: "auto", // Ajuste automático al contenido
          width: "100%",
        }}
      >
        <label style={{ marginBottom: "10px" }}>Título:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          style={{ marginBottom: "10px", width: "100%" }}
        />

        <label style={{ marginBottom: "10px" }}>Categoría:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
          style={{ marginBottom: "10px", width: "100%" }}
        />

        <label style={{ marginBottom: "10px" }}>Ubicación:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          required
          style={{ marginBottom: "10px", width: "100%" }}
        />

        <label style={{ marginBottom: "10px" }}>Resumen:</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleInputChange}
          required
          style={{ marginBottom: "10px", width: "100%" }}
        />

        <label style={{ marginBottom: "10px" }}>Detalles:</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleInputChange}
          required
          style={{ marginBottom: "10px", width: "100%" }}
        />

        <label style={{ marginBottom: "10px" }}>Imagen:</label>
        {recommendationImageURL && (
          <img
            src={recommendationImageURL}
            alt="Recommendation"
            style={{ marginBottom: "10px", width: "100%", maxWidth: "200px" }}
          />
        )}
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#d93030",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default EditRecommendationPage;
