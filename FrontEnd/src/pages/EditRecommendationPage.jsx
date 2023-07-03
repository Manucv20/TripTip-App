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
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const fetchRecommendation = async () => {
            try {
                const response = await getRecommendationById(recommendationId);
                console.log("response", response);
                if (response.success) {
                    const { result } = response;
                    if (result) {
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
                        setRecommendationImageURL(result.image);
                    }
                } else {
                    console.error("Error al obtener la recomendación:", response.error);
                }
            } catch (error) {
                console.error("Error al obtener la recomendación:", error);
            }
        };

        if (recommendationId) {
            fetchRecommendation();
        }
    }, [recommendationId]);

    useEffect(() => {
        if (recommendationImageURL) {
            const image = new Image();
            image.src = recommendationImageURL;
            image.onload = () => {
                setImageLoaded(true);
            };
        }
    }, [recommendationImageURL]);

    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));

        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            [e.target.name]: null,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: file,
            }));
        }
    };

    const handleUpdateRecommendation = async () => {
        try {
            const updatedRecommendationData = {
                ...formData,
            };

            if (!token) {
                console.log("Error: No se encontró un token");
                return;
            }

            await editRecommendation(
                recommendationId,
                updatedRecommendationData,
                `Bearer ${token}`
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
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    {formErrors.title && <div>{formErrors.title}</div>}
                </div>
                <div>
                    <label htmlFor="category">Categoría</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                    />
                    {formErrors.category && <div>{formErrors.category}</div>}
                </div>
                <div>
                    <label htmlFor="location">Ubicación</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                    />
                    {formErrors.location && <div>{formErrors.location}</div>}
                </div>
                <div>
                    <label htmlFor="summary">Resumen</label>
                    <textarea
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleInputChange}
                    />
                    {formErrors.summary && <div>{formErrors.summary}</div>}
                </div>
                <div>
                    <label htmlFor="details">Detalles</label>
                    <textarea
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleInputChange}
                    />
                    {formErrors.details && <div>{formErrors.details}</div>}
                </div>
                <div>
                    <label htmlFor="image">Imagen</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                    />
                </div>
                {formData.image && (
                    <div>
                        <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Recommendation"
                        />
                    </div>
                )}
                {recommendationImageURL && !imageLoaded && (
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
