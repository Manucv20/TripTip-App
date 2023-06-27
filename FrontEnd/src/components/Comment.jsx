import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";
import { deleteCommentService } from "../services";

export const Comment = ({ comment, removeComment }) => {
  const { userData, token } = useContext(AuthContext);
  const [error, setError] = useState("");

  console.log(comment);
  const deleteComment = async (id) => {
    try {
      await deleteCommentService({ id, token });
      removeComment(id);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <p>
        {comment.username} {comment.created_at}
      </p>
      <div>
        <div>{comment.comment}</div>
        {userData && userData.userId === comment.user_id ? (
          <button onClick={() => deleteComment(comment.id)}>
            Delete comment
          </button>
        ) : null}
        {error ? <p>{error}</p> : null}
      </div>
    </section>
  );
};
