import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
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

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        console.log("recommendationId", recommendationId);
        const response = await getRecommendationById(recommendationId);
        console.log("response", response);
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
            image: result.image,
          }));
          setDataLoaded(true);
          setRecommendationImageURL(
            `${import.meta.env.VITE_APP_BACKEND}/uploads/${result.image}`
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
    console.log("formData", formData);
    console.log("token", token);
    try {
      if (!token) {
        console.log("Error: No se encontró un token");
        return;
      }

      const updatedRecommendationData = { ...formData };
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

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      location: "",
      summary: "",
      details: "",
      image: null,
    });

    setFormErrors({});
    setRecommendationImageURL("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateRecommendation();
  };

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Editar recomendación</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location">Ubicación</label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        {/* Summary */}
        <div>
          <label htmlFor="summary">Resumen</label>
          <textarea
            name="summary"
            id="summary"
            value={formData.summary}
            onChange={handleInputChange}
          />
        </div>

        {/* Details */}
        <div>
          <label htmlFor="details">Detalles</label>
          <textarea
            name="details"
            id="details"
            value={formData.details}
            onChange={handleInputChange}
          />
        </div>

        {/* Image */}
        <div>
          <label htmlFor="image">Imagen</label>
          {recommendationImageURL && (
            <img
              src={recommendationImageURL}
              alt="Recommendation"
              style={{ height: "200px" }}
            />
          )}
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Submit button */}
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default EditRecommendationPage;
