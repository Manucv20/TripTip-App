import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { createRecommendation } from "../services/getRecommendationsById";

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

        // Limpia los errores cuando el usuario modifica un campo
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
            recommendationData.append("image", formData.image);

            const newRecommendation = await createRecommendation(
                recommendationData,
                token
            );

            resetForm();
            console.log("Nueva recomendación creada:", newRecommendation);
            navigate("/myRecommendations");
        } catch (error) {
            console.log("Error al crear la recomendación:", error);
            // Mostrar mensaje de error al usuario
            alert("Error al crear la recomendación. Por favor, inténtalo de nuevo más tarde.");
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

        // Validación de tipo de archivo de imagen (ejemplo: solo se permiten JPEG y PNG)
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
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
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
                {formErrors.title && (
                    <p style={{ color: "red", marginBottom: "10px" }}>
                        {formErrors.title}
                    </p>
                )}
                <label style={{ marginBottom: "10px" }}>Categoría:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    style={{ marginBottom: "10px", width: "100%" }}
                />
                {formErrors.category && (
                    <p style={{ color: "red", marginBottom: "10px" }}>
                        {formErrors.category}
                    </p>
                )}
                <label style={{ marginBottom: "10px" }}>Ubicación:</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    style={{ marginBottom: "10px", width: "100%" }}
                />
                {formErrors.location && (
                    <p style={{ color: "red", marginBottom: "10px" }}>
                        {formErrors.location}
                    </p>
                )}
                <label style={{ marginBottom: "10px" }}>Resumen:</label>
                <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    required
                    style={{ marginBottom: "10px", width: "100%" }}
                />
                {formErrors.summary && (
                    <p style={{ color: "red", marginBottom: "10px" }}>
                        {formErrors.summary}
                    </p>
                )}
                <label style={{ marginBottom: "10px" }}>Detalles:</label>
                <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    required
                    style={{ marginBottom: "10px", width: "100%" }}
                />
                {formErrors.details && (
                    <p style={{ color: "red", marginBottom: "10px" }}>
                        {formErrors.details}
                    </p>
                )}
                <label style={{ marginBottom: "10px" }}>Imagen:</label>
                {formData.image && (
                    <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Selected"
                        style={{ marginBottom: "10px", width: "100%" }}
                    />
                )}
                <input
                    type="file"
                    name="image"
                    accept="image/jpeg, image/png"
                    onChange={handleImageChange}
                    style={{ marginBottom: "10px" }}
                />
                {formErrors.image && (
                    <p style={{ color: "red", marginBottom: "10px" }}>
                        {formErrors.image}
                    </p>
                )}
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        width: "100%",
                    }}
                >
                    Crear nueva recomendación
                </button>
            </form>
        </div>
    );
};

export default CreateRecommendationPage;
