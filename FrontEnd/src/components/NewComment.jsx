import { useState, useContext } from "react";
import { userCommentService } from "../services";
import { AuthContext } from "../context/AuthContext";

const NewComment = ({ trip, addComment }) => {
  const [comment, setComment] = useState("");
  const { token } = useContext(AuthContext);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      setSending(true);

      const userComment = await userCommentService(
        trip.result.id,
        comment,
        token
      );
      addComment(userComment);
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
      setComment("");
    }
  };

  const handleCancelComment = () => {
    setComment("");
  };

  return (
    <section className="NewComment">
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
          {sending ? <p>Sending comment</p> : null}
        </div>
      </form>
    </section>
  );
};

export default NewComment;
