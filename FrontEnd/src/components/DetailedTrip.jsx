import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { voteTripUserService } from "../services";

export const DetailedTrip = ({ trip }) => {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("");

  const voteTrip = async () => {
    try {
      await voteTripUserService(trip.result.id, token);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
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
          </div>
          <div className="vote-container" onClick={() => voteTrip()}>
            ❤️ {trip.votes}
          </div>
          {error ? <p>{error}</p> : null}
        </div>
      </div>
      <h1>{trip.result.title}</h1>
      <p>{trip.result.details}</p>
      <div>
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
      </div>
    </>
  );
};
