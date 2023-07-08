import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  voteRecommendationService,
  deleteVoteRecommendationService,
} from "../../services/votesService";
import { tripCommentsService } from "../../services";
import { useNavigate } from "react-router-dom";
import NewComment from "./NewComment";
import { CommentsList } from "./CommentsList";

export const DetailedTrip = ({ trip, comments, addComment, removeComment }) => {
  const navigate = useNavigate();
  const { token, auth, userData = {} } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [votes, setVotes] = useState(trip.votes);
  const [commentsList, setCommentsList] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const prevIsVoted = useRef(false);

  useEffect(() => {
    setVotes(trip.votes);
  }, [trip.votes]);

  useEffect(() => {
    if (trip.comments.length > 0) {
      const fetchComments = async () => {
        try {
          const commentsList = await tripCommentsService({
            id: trip.result.id,
          });
          setCommentsList(commentsList);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchComments();
    }
  }, [trip.comments, trip.result.id]);

  useEffect(() => {
    if (
      auth &&
      userData &&
      userData.userId &&
      trip.votes &&
      trip.votes.includes(userData.userId)
    ) {
      setIsVoted(true);
    } else {
      setIsVoted(false);
    }
  }, [auth, trip.votes, userData]);

  const handleVote = async () => {
    try {
      if (!auth) return navigate("/login");
      setError("");

      if (isVoted) {
        // Remove the vote
        const deletedVote = await deleteVoteRecommendationService(
          trip.result.id,
          userData.userId,
          token
        );
        console.log("deletedVote:", deletedVote);

        setVotes(deletedVote.votes);

        // Check if the previous value of isVoted was true
        // If it was true, set isVoted to false
        if (prevIsVoted.current) {
          setIsVoted(false);
        }
      } else {
        console.log("Creating vote...");

        // Create a new vote
        const createdVote = await voteRecommendationService(
          trip.result.id,
          userData.userId,
          token
        );
        console.log("createdVote:", createdVote);

        setVotes(createdVote.votes);
        setIsVoted(true);
      }
    } catch (error) {
      console.error("Error handling vote:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    prevIsVoted.current = isVoted;
  }, [isVoted]);

  return (
    <section className="DetailedTrip">
      <div className="image-content">
        {
          <img
            id="detailedPhoto"
            src={
              trip.result.image
                ? `${import.meta.env.VITE_APP_BACKEND}/uploads/${
                    trip.result.image
                  } `
                : "/Subir_foto_recomendacion.jpg"
            }
            alt={trip.result.summary}
          />
        }
        <div className="summary-container">
          <p id="summary">"{trip.result.summary}"</p>
          <div
            className={`vote-container ${isVoted ? "voted" : ""}`}
            onClick={handleVote}
          >
            <div style={{ cursor: "pointer" }}>
              {isVoted ? "❤️" : "💔"} {votes}
            </div>{" "}
            <div>{error && <p>{error}</p>}</div>
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
