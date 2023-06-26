import { useState } from "react";
import { userCommentService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const NewComment = ({ trip, addComment }) => {
  const [comment, setComment] = useState("");
  const { token } = useContext(AuthContext);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      const userComment = await userCommentService(
        trip.result.id,
        comment,
        token
      );
      addComment(userComment);
    } finally {
      setComment("");
    }
  };

  const handleCancelComment = () => {
    setComment("");
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
        <button
          type="button"
          className="comment-cancel-button"
          onClick={handleCancelComment}
        >
          Cancelar
        </button>
        <button type="submit" className="comment-submit-button">
          Comentar
        </button>
      </div>
    </form>
  );
};

export default NewComment;
