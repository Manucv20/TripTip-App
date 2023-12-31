import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchAPI } from "../../services/getRecommendations";

const SearchComponent = () => {
  const navigate = useNavigate();
  const [lugar, setLugar] = useState("");
  const [categoria, setCategoria] = useState("");
  const [windowWidth, setWindowWidth] = useState(0); // Inicializar con 0
  const [currentVideo, setCurrentVideo] = useState("video_header.mp4");
  const [videoIndex, setVideoIndex] = useState(0); // Nuevo estado para el índice del video

  const handleLugarChange = (event) => {
    setLugar(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchResults = await searchAPI(lugar, categoria);

    setLugar("");
    setCategoria("");

    navigate(`/search-results?query=${lugar}-${categoria}`, {
      state: { searchResults },
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Obtener el valor inicial de window.innerWidth después de que el componente se monte
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerStyle = {
    width: "100%",
    height: "350px",
    textAlign: "center",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const videoStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const contentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
  };

  const arrowContainerStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 2,
  };

  const arrowStyle = {
    width: "40px",
    height: "40px",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
  };

  const searchContainerStyle = {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
    flexDirection: "column", // Cambio aquí
    flexWrap: "wrap",
    alignItems: "center",
  };

  const inputContainerStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  };

  const inputStyle = {
    width: windowWidth < 600 ? "100%" : "200px",
    height: windowWidth < 600 ? "40%" : "40px",
    border: "none",
    borderRadius: "4px",
    marginRight: "10px",
    padding: "0 10px",
    fontSize: "16px",
    outline: "none",
  };

  const buttonStyle = {
    height: "40px",
    backgroundColor: "#D93030",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "0 20px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const videos = ["video_header.mp4", "video_header3.mp4", "video_header2.mp4"];

  const handlePrevVideo = () => {
    const newIndex = videoIndex === 0 ? videos.length - 1 : videoIndex - 1;
    setVideoIndex(newIndex);
    setCurrentVideo(videos[newIndex]);
  };

  const handleNextVideo = () => {
    const newIndex = videoIndex === videos.length - 1 ? 0 : videoIndex + 1;
    setVideoIndex(newIndex);
    setCurrentVideo(videos[newIndex]);
  };

  return (
    <header style={containerStyle}>
      <div style={arrowContainerStyle}>
        <div style={arrowStyle} onClick={handlePrevVideo}>
          &#8249;
        </div>
        <div style={arrowStyle} onClick={handleNextVideo}>
          &#8250;
        </div>
      </div>
      <video src={`/${currentVideo}`} style={videoStyle} autoPlay loop muted />
      <div style={contentStyle}>
        <h1
          style={{
            textShadow: "4px 4px 5px #000000",
            color: "white",
            margin: 0,
          }}
        >
          Miles de recomendaciones para tus viajes favoritos
        </h1>
        <div>
          <form onSubmit={handleSearch}>
            <div style={searchContainerStyle}>
              <div style={inputContainerStyle}>
                <input
                  type="text"
                  value={lugar}
                  onChange={handleLugarChange}
                  style={inputStyle}
                  placeholder="Lugar"
                />
              </div>
              <div style={inputContainerStyle}>
                <input
                  type="text"
                  value={categoria}
                  onChange={handleCategoriaChange}
                  style={inputStyle}
                  placeholder="Categoría"
                />
              </div>
              <button type="submit" style={buttonStyle}>
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default SearchComponent;
