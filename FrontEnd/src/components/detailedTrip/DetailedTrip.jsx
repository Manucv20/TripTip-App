import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { voteTripUserService } from "../../services";
import { useNavigate } from "react-router-dom";
import NewComment from "./NewComment";
import { CommentsList } from "./CommentsList";

export const DetailedTrip = ({ trip, comments, addComment, removeComment }) => {
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
      <div className="image-content">
        <img
          id="detailedPhoto"
          src={
            trip.result.image
              ? `${import.meta.env.VITE_APP_BACKEND}/uploads/${
                  trip.result.image
                }`
              : "/Subir_foto_recomendacion.jpg"
          }
          alt={trip.result.summary}
        />
        
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
      <div className="title-container">
        <h1>{trip.result.title}</h1>
        <p id="details">{trip.result.details}</p>
        <div id="datasheet">
          <h2>Información de viaje</h2>
          <p>Categoría:</p>
          <p>{trip.result.category}</p>
          <p>Dirección:</p>
          <p>{trip.result.location}</p>
          <p>Recomendado por:</p>
          <p>{trip.userResult.username}</p>
          <p>Fecha de recomendación:</p>
          <p>{new Date(trip.result.created_at).toLocaleDateString("es-ES")}</p>
        </div>
      </div>
      <div className="comments-container">
        {auth && <NewComment trip={trip} addComment={addComment} />}
        <CommentsList comments={comments} removeComment={removeComment} />
      </div>{" "}
    </section>
  );
};