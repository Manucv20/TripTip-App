import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { deleteCommentService } from "../services";

export const Comment = ({ comment, removeComment }) => {
  const { userData, token } = useContext(AuthContext);
  const [error, setError] = useState("");

  const deleteComment = async (id) => {
    console.log(id);
    console.log(token);
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
        {comment.user_id} {comment.created_at}
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
