import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { voteTripUserService } from "../services";
import { useNavigate } from "react-router-dom";

export const DetailedTrip = ({ trip }) => {
  const navigate = useNavigate();
  const { userData, token, auth } = useContext(AuthContext);
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
          <img
            id="detailedPhoto"
            src={`${import.meta.env.VITE_APP_BACKEND}/uploads/${
              trip.result.image
            }`}
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
      </div>
      <div>
        <h1>{trip.result.title}</h1>
        <p id="details">{trip.result.details}</p>
      </div>
      <div id="datasheet">
        <h2>Trip information:</h2>
        <p>Category:</p>
        <p>{trip.result.category}</p>
        <p>Address:</p>
        <p>{trip.result.location}</p>
        <p>Recommended by:</p>
        <p>{trip.result.user_id}</p>
        <p>{trip.result.created_at}</p>
      </div>
    </section>
  );
};
