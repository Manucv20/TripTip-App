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
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleCreateRecommendation = async () => {
        try {
            const recommendationData = {
                title: formData.title,
                category: formData.category,
                location: formData.location,
                summary: formData.summary,
                details: formData.details,
                // Otros campos de datos que necesites para crear la recomendación
            };

            if (!token) {
                console.log("Error: No token found");
                return;
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
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                padding: "20px",
                boxSizing: "border-box",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "400px",
                    width: "100%",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                }}
            >
                <label style={{ marginBottom: "10px" }}>Título:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    style={{ marginBottom: "10px" }}
                />
                {formErrors.title && <p>{formErrors.title}</p>}
                <label style={{ marginBottom: "10px" }}>Categoría:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    style={{ marginBottom: "10px" }}
                />
                {formErrors.category && <p>{formErrors.category}</p>}
                <label style={{ marginBottom: "10px" }}>Ubicación:</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    style={{ marginBottom: "10px" }}
                />
                {formErrors.location && <p>{formErrors.location}</p>}
                <label style={{ marginBottom: "10px" }}>Resumen:</label>
                <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    required
                    style={{ marginBottom: "10px" }}
                />
                {formErrors.summary && <p>{formErrors.summary}</p>}
                <label style={{ marginBottom: "10px" }}>Detalles:</label>
                <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    required
                    style={{ marginBottom: "10px" }}
                />
                {formErrors.details && <p>{formErrors.details}</p>}
                <label style={{ marginBottom: "10px" }}>Imagen:</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    style={{ marginBottom: "10px" }}
                />
                <button type="submit">Crear nueva recomendación</button>
            </form>
        </div>
    );
};

export default CreateRecommendationPage;
