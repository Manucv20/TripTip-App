import { useState } from "react";
import { userCommentService } from "../services";

export const DetailedTripComments = ({ trip }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      await userCommentService({ trip: result.id }, comment);
    } finally {
      setComment("");
    }
  };

  return (
    <>
      <div>
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
      </div>
      <div>
        {trip.comments.map((comment) => (
          <div key={comment.id}>
            <p>
              {comment.user_id}---{comment.created_at}
            </p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
};
