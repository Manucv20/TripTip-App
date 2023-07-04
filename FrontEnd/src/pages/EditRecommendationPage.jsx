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
            await editRecommendation(recommendationId, updatedRecommendationData, token);

            console.log("Recomendación actualizada");
            navigate("/myRecommendations");
        } catch (error) {
            console.log("Error al actualizar la recomendación:", error);
            alert("Error al actualizar la recomendación. Por favor, inténtalo de nuevo más tarde.");
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            handleUpdateRecommendation();
        }
    };

    if (!dataLoaded) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Editar Recomendación</h2>
            <form
                onSubmit={handleSubmit}
                style={{ maxWidth: "500px", margin: "0 auto" }}
            >
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                    />
                    {formErrors.title && <div>{formErrors.title}</div>}
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="category">Categoría</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                    />
                    {formErrors.category && <div>{formErrors.category}</div>}
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="location">Ubicación</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                    />
                    {formErrors.location && <div>{formErrors.location}</div>}
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="summary">Resumen</label>
                    <textarea
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                    />
                    {formErrors.summary && <div>{formErrors.summary}</div>}
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="details">Detalles</label>
                    <textarea
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                    />
                    {formErrors.details && <div>{formErrors.details}</div>}
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="image">Imagen</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                    />
                </div>
                {recommendationImageURL && (
                    <div style={{ marginBottom: "1rem", textAlign: "center" }}>
                        <img
                            src={recommendationImageURL}
                            alt="Img preview"
                            style={{ maxWidth: "100%", maxHeight: "300px" }}
                        />
                    </div>
                )}

                {formData.image && !recommendationImageURL && (
                    <div>Cargando imagen...</div>
                )}

                <button type="submit">Actualizar</button>
                <button type="button" onClick={resetForm}>
                    Reiniciar
                </button>
            </form>
        </div>
    );
};

export default EditRecommendationPage;
