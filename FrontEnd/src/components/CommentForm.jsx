import { useState } from "react";
import { userCommentService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const CommentForm = ({ trip }) => {
  const [comment, setComment] = useState("");
  const { token } = useContext(AuthContext);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      await userCommentService(trip.result.id, comment, token);
    } finally {
      setComment("");
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmitComment}>
      <textarea
        value={comment}
        className="comment-textarea"
        placeholder="Añade un comentario"
        onChange={handleCommentChange}
      ></textarea>
      <div className="comment-buttons">
        <button className="comment-cancel-button">Cancelar</button>
        <button className="comment-submit-button">Comentar</button>
      </div>
    </form>
  );
};
