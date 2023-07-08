import { useState, useContext } from "react";
import { userCommentService } from "../../services";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../user/Avatar";

const NewComment = ({ trip, addComment }) => {
  const { userData, token } = useContext(AuthContext);
  const [comment, setComment] = useState("");
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
      <div className="NewComment-container">
        <Avatar
          imagen={userData.imagen}
          className="avatar-nc"
          estilo={{ width: "65px", height: "65px" }}
        />
        <form className="comment-form" onSubmit={handleSubmitComment}>
          <textarea
            value={comment}
            className="comment-textarea"
            placeholder="Añade un comentario..."
            onChange={handleCommentChange}
          ></textarea>
          <div className="comment-buttons">
            <button
              alt="cancelar comentario"
              type="button"
              className="comment-cancel-button"
              onClick={handleCancelComment}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="comment-submit-button"
              alt=" enviar comentario"
            >
              Comentar
            </button>
            {sending ? <p>Sending comment</p> : null}
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewComment;
