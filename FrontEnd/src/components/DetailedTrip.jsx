import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { voteTripUserService } from "../services";
import { useNavigate } from "react-router-dom";

export const DetailedTrip = ({ trip }) => {
  const navigate = useNavigate();
  const { token, auth } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [votes, setVotes] = useState(trip.votes);

  const voteTrip = async () => {
    try {
      if (!auth) return navigate("/login");
      setError("");
      const vote = await voteTripUserService(trip.result.id, token);
      setVotes(vote);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="DetailedTrip">
      <div className="image-container">
        <div className="image-content">
          {trip.result.image ? (
            <img
              id="detailedPhoto"
              src={`${import.meta.env.VITE_APP_BACKEND}/uploads/${
                trip.result.image
              }`}
              alt={trip.result.summary}
            />
          ) : null}
          <div className="summary-container">
            <p id="summary">"{trip.result.summary}"</p>
            <div className="vote-container" onClick={voteTrip}>
              <div
                style={{
                  cursor: "pointer",
                }}
              >
                ❤️ {votes}
              </div>{" "}
              <div>{error ? <p>{error}</p> : null}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>{trip.result.title}</h1>
        <p id="details">{trip.result.details}</p>
      </div>
      <div id="datasheet">
        <h2>Información de viaje:</h2>
        <p>Categoría:</p>
        <p>{trip.result.category}</p>
        <p>Dirección:</p>
        <p>{trip.result.location}</p>
        <p>Recomendado por:</p>
        <p>{trip.userResult.username}</p>
        <p>Fecha de recomendación:</p>
        <p>{new Date(trip.result.created_at).toLocaleDateString("es-ES")}</p>
      </div>
    </section>
  );
};
