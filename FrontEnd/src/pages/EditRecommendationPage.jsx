import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { editRecommendation } from "../services/getRecommendationsById";

const EditRecommendationPage = ({
    recommendation,
    createdRecommendations,
    setCreatedRecommendations,
    setShowForm,
}) => {
    const { userData, token } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        title: recommendation.title,
        category: recommendation.category,
        location: recommendation.location,
        summary: recommendation.summary,
        details: recommendation.details,
        // Otros campos de datos que necesites para editar la recomendación
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditRecommendation = async () => {
        try {
            const editedRecommendationData = {
                title: formData.title,
                category: formData.category,
                location: formData.location,
                summary: formData.summary,
                details: formData.details,
                // Otros campos de datos que necesites para editar la recomendación
            };

            const updatedRecommendation = await editRecommendation(
                recommendation.id,
                editedRecommendationData,
                token
            );

            const updatedRecommendations = createdRecommendations.map((rec) => {
                if (rec.id === recommendation.id) {
                    return updatedRecommendation;
                }
                return rec;
            });

            setCreatedRecommendations(updatedRecommendations);
            console.log("Recomendación editada:", recommendation.id);
            setShowForm(false);
        } catch (error) {
            console.log("Error al editar la recomendación:", error);
        }
    };

    return (
        <form>
            <label>Título:</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
            />
            <label>Categoría:</label>
            <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
            />
            <label>Ubicación:</label>
            <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
            />
            <label>Resumen:</label>
            <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
            />
            <label>Detalles:</label>
            <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
            />
            <button type="button" onClick={handleEditRecommendation}>
                Editar recomendación
            </button>
        </form>
    );
};

export default EditRecommendationPage;
