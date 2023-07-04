import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { createRecommendation } from "../services/getRecommendationsById";
import DefaultImage from "../../public/Subir_foto_recomendacion.jpg";

const CreateRecommendationPage = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        location: "",
        summary: "",
        details: "",
        image: null,
    });

    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setFormErrors({
            ...formErrors,
            [e.target.name]: null,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleCreateRecommendation = async () => {
        try {
            if (!token) {
                console.log("Error: No se encontró el token");
                return;
            }

            const recommendationData = new FormData();
            recommendationData.append("title", formData.title);
            recommendationData.append("category", formData.category);
            recommendationData.append("location", formData.location);
            recommendationData.append("summary", formData.summary);
            recommendationData.append("details", formData.details);

            if (formData.image) {
                recommendationData.append("image", formData.image);
            }

            const newRecommendation = await createRecommendation(
                recommendationData,
                token
            );

            resetForm();
            console.log("Nueva recomendación creada:", newRecommendation);
            navigate("/myRecommendations");
        } catch (error) {
            console.log("Error al crear la recomendación:", error);
            alert(
                "Error al crear la recomendación. Por favor, inténtalo de nuevo más tarde."
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
    };

    const validateForm = () => {
        const errors = {};

        if (formData.title.trim() === "") {
            errors.title = "El título es requerido";
        }

        if (formData.category.trim() === "") {
            errors.category = "La categoría es requerida";
        }

        if (formData.location.trim() === "") {
            errors.location = "La ubicación es requerida";
        }

        if (formData.summary.trim() === "") {
            errors.summary = "El resumen es requerido";
        }

        if (formData.details.trim() === "") {
            errors.details = "Los detalles son requeridos";
        }

        if (formData.image && !formData.image.type.includes("image/")) {
            errors.image = "Por favor, selecciona un archivo de imagen válido";
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            await handleCreateRecommendation();
        }
    };

    return (
        <div className="create-recommendation-page">
            <form onSubmit={handleSubmit} className="create-recommendation-form">
                <label>Título:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
                {formErrors.title && <p className="error">{formErrors.title}</p>}

                <label>Categoría:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                />
                {formErrors.category && <p className="error">{formErrors.category}</p>}

                <label>Ubicación:</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                />
                {formErrors.location && (
                    <p className="error">{formErrors.location}</p>
                )}

                <label>Resumen:</label>
                <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    required
                />
                {formErrors.summary && <p className="error">{formErrors.summary}</p>}

                <label>Detalles:</label>
                <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    required
                />
                {formErrors.details && <p className="error">{formErrors.details}</p>}

                <label>Imagen:</label>
                <input
                    type="file"
                    name="image"
                    accept="image/jpeg, image/png"
                    onChange={handleImageChange}
                />
                {formErrors.image && <p className="error">{formErrors.image}</p>}

                {formData.image ? (
                    <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        className="image-preview"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                ) : (
                    <img
                        src={DefaultImage}
                        alt="Default Preview"
                        className="image-preview"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                )}

                <button type="submit" className="submit-button">
                    Crear recomendación
                </button>
            </form>

            <style>{`
        .create-recommendation-page {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          padding: 0 20px; /* Agrega margen a los lados */
          box-sizing: border-box; /* Incluye el padding en el ancho total */
        }

        .create-recommendation-form {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #f1f1f1;
        }

        .create-recommendation-form label {
          display: block;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .create-recommendation-form input,
        .create-recommendation-form textarea {
          margin-bottom: 10px;
          width: 100%;
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .create-recommendation-form .error {
          color: red;
          margin-bottom: 10px;
        }

        .create-recommendation-form .image-preview {
          margin-bottom: 10px;
          max-width: 100%;
          max-height: 200px;
        }

        .create-recommendation-form .submit-button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          width: 100%;
        }
      `}</style>
        </div>
    );
};

export default CreateRecommendationPage;
